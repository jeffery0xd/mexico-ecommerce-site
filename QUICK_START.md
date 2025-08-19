# Quick Start Guide

## 🚀 5-Minute Setup

### Prerequisites
- Node.js 18+
- A Supabase account
- Git

### Step 1: Clone & Install
```bash
git clone <your-repo-url>
cd mexico-ecommerce-site
npm install
```

### Step 2: Environment Setup
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

### Step 3: Database Setup
1. Create a new Supabase project
2. Run the SQL commands from `DATABASE_SCHEMA.md`
3. Add sample data (optional)

### Step 4: Run Development Server
```bash
npm run dev
```
Visit: http://localhost:5173

### Step 5: Access Admin Panel
- URL: http://localhost:5173/admin
- Password: `19961015`

## 🏗️ Project Features

### User Features
- ✅ Product browsing with 2-column mobile grid
- ✅ Category navigation
- ✅ Product search
- ✅ Responsive design
- ✅ MercadoLibre-style UI

### Admin Features
- ✅ Product management (add, edit, delete)
- ✅ Product pinning (featured products)
- ✅ SEO settings (custom page titles)
- ✅ Category management
- ✅ Real-time updates

### Technical Features
- ✅ React + TypeScript
- ✅ Tailwind CSS styling
- ✅ Supabase backend
- ✅ Mobile-first responsive design
- ✅ Scroll position fix for SPA navigation

## 📱 Testing Checklist

### Frontend Testing
- [ ] Homepage loads correctly
- [ ] Product listings display in 2-column mobile grid
- [ ] Product detail pages show complete information
- [ ] Navigation works on all screen sizes
- [ ] Search functionality works
- [ ] Page transitions scroll to top

### Admin Testing
- [ ] Admin login works (password: 19961015)
- [ ] Can add new products
- [ ] Can edit existing products
- [ ] Can pin/unpin products
- [ ] SEO settings save correctly
- [ ] Product order reflects pinning

### Mobile Testing
- [ ] 2-column product grid on mobile
- [ ] Touch navigation works smoothly
- [ ] Images load and display correctly
- [ ] Text is readable on small screens

## 🚀 Deployment

### Option 1: Cloudflare Pages (Recommended)
1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables

### Option 2: Quick Deploy
```bash
# Build for production
npm run build

# Deploy dist folder to any static hosting
# (Netlify, Vercel, etc.)
```

## 🔧 Customization

### Change Branding
1. Replace `public/logo.svg` with your logo
2. Update colors in `src/App.css`
3. Modify text content in components

### Add New Product Categories
1. Access admin panel
2. Add categories via Supabase dashboard
3. Update category icons in `Header.tsx`

### Modify SEO Settings
1. Login to admin panel
2. Click "SEO Settings"
3. Customize title templates
4. Save changes

## 📞 Need Help?

### Common Issues
1. **Build fails**: Check Node.js version (18+ required)
2. **Database errors**: Verify Supabase credentials
3. **Images not loading**: Check image URLs and CORS

### Resources
- `README.md` - Complete documentation
- `DATABASE_SCHEMA.md` - Database structure
- `CLOUDFLARE.md` - Deployment guide
- Project repository issues

---

**Ready to launch your Mexican e-commerce site! 🇲🇽**