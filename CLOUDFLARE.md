# Cloudflare Pages Deployment Guide

## Quick Setup

### 1. Repository Setup
```bash
git init
git add .
git commit -m "Initial commit: MercadoLibre Mexico e-commerce site"
git remote add origin https://github.com/yourusername/mexico-ecommerce-site.git
git push -u origin main
```

### 2. Cloudflare Pages Configuration

**Build Settings:**
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `18`

**Environment Variables:**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_ENVIRONMENT=production
```

### 3. Custom Domain (Optional)

1. Go to your Cloudflare Pages project
2. Navigate to "Custom domains"
3. Add your domain (e.g., `mercadolibre-mexico.com`)
4. Update DNS records as instructed

### 4. Performance Optimization

**Headers Configuration:**
Create `public/_headers` file:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000

/*.js
  Content-Type: application/javascript; charset=utf-8

/*.css
  Content-Type: text/css; charset=utf-8
```

**Redirects Configuration:**
Create `public/_redirects` file:
```
# SPA redirect
/*    /index.html   200

# Admin route
/admin/*  /admin/index.html  200

# Category redirects (if needed)
/category/*  /categoria/:splat  301
/product/*   /producto/:splat   301
```

### 5. SSL/TLS Settings

- Cloudflare automatically provides SSL
- Recommended: "Full (strict)" SSL mode
- Enable "Always Use HTTPS"
- Enable "HTTP Strict Transport Security (HSTS)"

### 6. Analytics Setup

```html
<!-- Add to index.html if needed -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "your-token"}'></script>
```

## Alternative Platforms

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### GitHub Pages
Add `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```