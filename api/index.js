const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const securityMiddleware = require('./middleware/security');
const obfuscatorMiddleware = require('./middleware/obfuscator');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Load pages configuration
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'pages.json'), 'utf8'));

// Load plugins data (if exists)
let pluginsData = [];
const pluginsDataPath = path.join(__dirname, 'data', 'plugins.json');
if (fs.existsSync(pluginsDataPath)) {
  try {
    pluginsData = JSON.parse(fs.readFileSync(pluginsDataPath, 'utf8'));
  } catch (error) {
    console.error('Error loading plugins data:', error);
  }
}

// Middleware
app.use(securityMiddleware); // Apply security middleware first
app.use(compression()); // Compress responses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'umbraix-plugins-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

// Apply obfuscator middleware before static files
app.use(obfuscatorMiddleware);

// Static files
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

// Create data directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
  
  // Create initial plugins.json if it doesn't exist
  if (!fs.existsSync(pluginsDataPath)) {
    const initialPlugins = [
      {
        "id": "jobs",
        "name": "Umbraix Jobs",
        "desc": "A free Jobs Reborn alternative",
        "price": 0,
        "downloads": 120,
        "category": "Economy",
        "version": "1.0.0",
        "premium": false
      },
      {
        "id": "chat",
        "name": "Umbraix Chat",
        "desc": "Advanced chat formatting and channels",
        "price": 9.99,
        "downloads": 85,
        "category": "Utility",
        "version": "2.1.0",
        "premium": true
      },
      {
        "id": "shop",
        "name": "Umbraix Shop",
        "desc": "Create GUI shops with custom items",
        "price": 0,
        "downloads": 95,
        "category": "Economy",
        "version": "1.5.2",
        "premium": false
      }
    ];
    fs.writeFileSync(pluginsDataPath, JSON.stringify(initialPlugins, null, 2));
    pluginsData = initialPlugins;
  }
}

// Setup routes from pages.json
pages.forEach(page => {
  if (page.path === '/plugins/:id') {
    // Handle dynamic plugin routes
    app.get(page.path, (req, res) => {
      const pluginId = req.params.id;
      const plugin = pluginsData.find(p => p.id === pluginId);
      
      if (!plugin) {
        return res.status(404).render('404', {
          title: 'Plugin Not Found | Umbraix Plugins',
          description: 'The plugin you are looking for does not exist.'
        });
      }
      
      res.render(page.template, {
        title: `${plugin.name} | Umbraix Plugins`,
        description: plugin.desc,
        plugin,
        path: '/plugins'
      });
    });
  } else if (page.path === '/plugins') {
    // Handle plugins listing with advanced filtering
    app.get(page.path, (req, res) => {
      const category = req.query.category;
      const priceFilter = req.query.price;
      const sortBy = req.query.sort || 'relevance';
      let filteredPlugins = [...pluginsData]; // Create a copy to avoid modifying the original
      
      // Apply category filter
      if (category) {
        filteredPlugins = filteredPlugins.filter(p => 
          p.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Apply price filter
      if (priceFilter) {
        if (priceFilter === 'free') {
          filteredPlugins = filteredPlugins.filter(p => !p.premium);
        } else if (priceFilter === 'premium') {
          filteredPlugins = filteredPlugins.filter(p => p.premium);
        }
      }
      
      // Apply sorting
      if (sortBy === 'newest') {
        // Sort by version number (as a proxy for newest)
        filteredPlugins.sort((a, b) => {
          const versionA = a.version.split('.').map(Number);
          const versionB = b.version.split('.').map(Number);
          
          for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
            const numA = versionA[i] || 0;
            const numB = versionB[i] || 0;
            if (numA !== numB) return numB - numA; // Descending order
          }
          return 0;
        });
      } else if (sortBy === 'downloads') {
        // Sort by downloads (descending)
        filteredPlugins.sort((a, b) => b.downloads - a.downloads);
      }
      
      // Calculate category counts for sidebar
      const categoryCount = {};
      pluginsData.forEach(plugin => {
        const cat = plugin.category.toLowerCase();
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });
      
      // Helper function for generating sort URLs
      const { generateSortUrl } = require('./src/helpers/urlHelpers');
      
      res.render(page.template, {
        title: page.title,
        description: page.description,
        plugins: filteredPlugins,
        category,
        priceFilter,
        sortBy,
        totalPlugins: pluginsData.length,
        categoryCount,
        path: page.path,
        generateSortUrl: (sort) => generateSortUrl(sort, { category, price: priceFilter })
      });
    });
  } else if (page.path === '*') {
    // 404 route (should be last)
    app.use((req, res) => {
      res.status(404).render(page.template, {
        title: page.title,
        description: page.description,
        path: req.path
      });
    });
  } else {
    // Standard routes
    app.get(page.path, (req, res) => {
      res.render(page.template, {
        title: page.title,
        description: page.description,
        path: page.path
      });
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Umbraix Plugins website running on http://localhost:${PORT}`);
});
