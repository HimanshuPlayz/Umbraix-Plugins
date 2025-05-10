/**
 * Security Middleware for Umbraix Plugins Website
 * This middleware adds security headers to all responses
 */

module.exports = function securityMiddleware(req, res, next) {
  // Prevent browsers from detecting the mimetype of a response based on the response's content
  // This helps prevent MIME type sniffing attacks
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Prevents the browser from rendering the page if it detects a potential XSS attack
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Control how much information the browser includes when navigating from your site to another
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Prevent the page from being framed (clickjacking protection)
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Content Security Policy to prevent various attacks
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +  // Allow inline scripts for our security.js
    "style-src 'self' 'unsafe-inline'; " +   // Allow inline styles for Tailwind
    "img-src 'self' data:; " +               // Allow images from our domain and data URIs
    "font-src 'self'; " +                    // Allow fonts from our domain
    "connect-src 'self'; " +                 // Allow connections to our domain
    "frame-src 'none'; " +                   // Disallow frames
    "object-src 'none';"                     // Disallow objects/plugins
  );
  
  // Permissions Policy (formerly Feature Policy) to limit features
  res.setHeader('Permissions-Policy', 
    'camera=(), ' +                          // Disable camera
    'microphone=(), ' +                      // Disable microphone
    'geolocation=(), ' +                     // Disable geolocation
    'payment=()'                             // Disable payment API
  );
  
  // Add custom header to make scraping harder
  res.setHeader('X-Umbraix-Protection', 'enabled');
  
  // Disable caching for dynamic content
  if (req.method === 'GET' && !req.path.match(/\.(css|js|jpg|png|gif|svg|ico)$/i)) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }
  
  next();
};
