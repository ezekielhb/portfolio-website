# Vercel Deployment Guide - Vite React Portfolio

This guide covers deploying your Vite + React portfolio website to Vercel.

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- GitHub, GitLab, or Bitbucket account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Your project pushed to a Git repository

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Vercel will auto-detect this as a Vite project
5. **Build settings will be automatically configured:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click "Deploy"

#### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

### 3. Environment Variables (If Needed)

If your portfolio uses any environment variables, add them in Vercel dashboard:

1. Go to your project settings
2. Click "Environment Variables"
3. Add variables (remember Vite variables must start with `VITE_`):

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CONTACT_EMAIL=your.email@example.com
VITE_SITE_URL=https://your-domain.vercel.app
```

## 📁 Project Configuration

Your project is already configured with the following Vercel-optimized files:

### `vercel.json`
- Configures Vite build settings
- Sets up SPA routing (all routes → index.html)
- Optimizes caching for static assets

### `vite.config.ts`
- Optimized build configuration
- Code splitting for better performance
- Production-ready settings

### `package.json`
- Node.js version specified (>=18.0.0)
- Correct build scripts for Vercel

## 🔧 Build Process

When deployed to Vercel:

1. **Install Phase**: `npm install` (or pnpm/yarn based on lock file)
2. **Build Phase**: `npm run build`
   - Vite compiles TypeScript
   - Optimizes and bundles assets
   - Outputs to `dist/` directory
3. **Deploy Phase**: Static files served via Vercel's CDN

## ✅ Deployment Checklist

### Before Deploying:
- [ ] Code is pushed to Git repository
- [ ] All dependencies are in package.json
- [ ] Build works locally: `npm run build`
- [ ] Preview works locally: `npm run preview`

### After Deployment:
- [ ] Site loads at Vercel URL
- [ ] All pages/routes work correctly
- [ ] Images and assets load properly
- [ ] Responsive design works on mobile
- [ ] Forms function correctly (if applicable)
- [ ] Dark/light theme switching works

## 🐛 Common Issues & Solutions

### Build Fails
- **TypeScript errors**: Fix type issues in your code
- **Missing dependencies**: Ensure all imports are in package.json
- **Environment variables**: Add required VITE_ prefixed variables

### Runtime Issues
- **404 on refresh**: Should be handled by vercel.json rewrites
- **Assets not loading**: Check asset paths are relative
- **API calls failing**: Ensure CORS is properly configured

### Performance Issues
- **Large bundle**: Check vite.config.ts chunk splitting
- **Slow loading**: Optimize images and enable lazy loading

## 🔒 Security & Performance

Your deployment includes:
- ✅ Static file caching headers
- ✅ Asset optimization
- ✅ Code splitting for faster loading
- ✅ Automatic HTTPS
- ✅ Global CDN distribution

## 📊 Monitoring

### Vercel Analytics
- Automatically tracks Core Web Vitals
- Monitor page load performance
- View function execution logs (if using API routes)

### Custom Analytics
Add Google Analytics by including your tracking ID in environment variables.

## 🎨 Customization

### Domain Setup
1. Go to project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Build Optimization
- Images: Use modern formats (WebP, AVIF)
- Fonts: Preload critical fonts
- Code: Remove unused dependencies

## 🔄 Continuous Deployment

With Vercel + Git:
- ✅ Auto-deploy on push to main branch
- ✅ Preview deployments for pull requests
- ✅ Instant rollbacks if needed
- ✅ Build logs and error reporting

## 🛠️ Advanced Configuration

### Custom Build Command
If needed, you can override in Vercel dashboard:
```bash
# For specific Node version
npm run build

# With specific package manager
pnpm run build
```

### Headers & Redirects
Additional configuration can be added to `vercel.json` for:
- Security headers
- Custom redirects
- API proxying

---

## 🎉 You're Ready to Deploy!

Your Vite + React portfolio is fully configured for Vercel deployment. The build process will be fast and the site will be globally distributed with excellent performance.

**Next Steps:**
1. Push your code to Git
2. Connect to Vercel
3. Deploy and share your portfolio!

---

**Need help?** Check [Vercel's Vite documentation](https://vercel.com/docs/frameworks/vite) or [contact support](https://vercel.com/support).