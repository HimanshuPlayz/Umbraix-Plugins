/**
 * Umbraix Plugins Website Security Module
 * This file contains security measures to protect against code theft and unauthorized actions
 */

(function() {
  'use strict';
  
  // ===== Disable Right-Click Menu =====
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });
  
  // ===== Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U =====
  document.addEventListener('keydown', function(e) {
    // Prevent F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+Shift+I (Inspect Element)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }
    
    // Prevent Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }
  });
  
  // ===== Disable Text Selection =====
  document.addEventListener('selectstart', function(e) {
    // Allow selection only in form inputs and textareas
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  });
  
  // ===== Disable Drag and Drop =====
  document.addEventListener('dragstart', function(e) {
    // Allow drag only for specific elements if needed
    if (!e.target.classList.contains('draggable')) {
      e.preventDefault();
      return false;
    }
  });
  
  // ===== Disable Copy/Cut =====
  document.addEventListener('copy', function(e) {
    // Allow copy only in form inputs and textareas
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  });
  
  document.addEventListener('cut', function(e) {
    // Allow cut only in form inputs and textareas
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  });
  
  // ===== Detect and Block DevTools =====
  const devToolsDetector = {
    isOpen: false,
    orientation: undefined,
    
    init: function() {
      this.detectDevTools();
      window.addEventListener('resize', this.detectDevTools.bind(this));
    },
    
    detectDevTools: function() {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      
      if (widthThreshold || heightThreshold) {
        if (!this.isOpen) {
          this.isOpen = true;
          this.takeAction();
        }
      } else {
        this.isOpen = false;
      }
    },
    
    takeAction: function() {
      // Alert the user and redirect
      alert('Developer tools are not allowed on this site for security reasons.');
      window.location.href = window.location.href; // Refresh the page
    }
  };
  
  // Initialize DevTools detector
  devToolsDetector.init();
  
  // ===== Code Obfuscation Notice =====
  // Note: This file should be obfuscated using a tool like javascript-obfuscator
  // before deployment to production for maximum security
  
  // ===== Add Custom Watermark =====
  function addWatermark() {
    const watermark = document.createElement('div');
    watermark.innerHTML = `© ${new Date().getFullYear()} Umbraix Plugins - All Rights Reserved`;
    watermark.style.position = 'fixed';
    watermark.style.bottom = '10px';
    watermark.style.right = '10px';
    watermark.style.color = 'rgba(255, 255, 255, 0.2)';
    watermark.style.fontSize = '12px';
    watermark.style.pointerEvents = 'none';
    watermark.style.zIndex = '9999';
    document.body.appendChild(watermark);
  }
  
  // Add watermark when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addWatermark);
  } else {
    addWatermark();
  }
  
  // ===== Console Warning =====
  console.log('%c⚠️ Warning!', 'color: red; font-size: 30px; font-weight: bold;');
  console.log('%cThis is a protected website. Unauthorized access to this console may result in legal action.', 'color: red; font-size: 16px;');
  
  // ===== Iframe Protection =====
  if (window.self !== window.top) {
    // If the site is loaded in an iframe, break out
    window.top.location.href = window.self.location.href;
  }
  
})();
