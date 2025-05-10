/**
 * JavaScript Obfuscator Middleware for Umbraix Plugins Website
 * This middleware obfuscates JavaScript files to make them harder to read and copy
 */

const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Cache for obfuscated files to avoid re-obfuscation on every request
const obfuscatedCache = new Map();

module.exports = function obfuscatorMiddleware(req, res, next) {
  // Only process .js files that aren't already in the cache
  if (!req.path.endsWith('.js') || req.path.includes('min.js')) {
    return next();
  }
  
  // Skip node_modules and certain files
  if (req.path.includes('node_modules') || 
      req.path.includes('vendor') || 
      req.path.includes('jquery')) {
    return next();
  }
  
  try {
    // Get the absolute path to the requested file
    const filePath = path.join(__dirname, '..', req.path);
    
    // Check if we have a cached version
    if (obfuscatedCache.has(filePath)) {
      const cachedContent = obfuscatedCache.get(filePath);
      res.set('Content-Type', 'application/javascript');
      return res.send(cachedContent);
    }
    
    // Read the file
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        return next(); // Let Express handle the 404
      }
      
      // Obfuscate the JavaScript
      const obfuscationResult = JavaScriptObfuscator.obfuscate(content, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.7,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: true,
        debugProtectionInterval: true,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ['base64'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
      });
      
      // Cache the obfuscated content
      const obfuscatedCode = obfuscationResult.getObfuscatedCode();
      obfuscatedCache.set(filePath, obfuscatedCode);
      
      // Send the obfuscated JavaScript
      res.set('Content-Type', 'application/javascript');
      res.send(obfuscatedCode);
    });
  } catch (error) {
    console.error('Error in obfuscator middleware:', error);
    next();
  }
};
