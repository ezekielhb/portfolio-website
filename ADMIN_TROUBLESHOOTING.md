# Admin Route Troubleshooting Guide

## Issue: /admin returns 404 error

If you're getting a 404 error when accessing `/admin`, here are the steps to resolve it:

## Quick Diagnosis

First, try accessing `/admin/test` instead of `/admin`. This will help determine if the issue is routing-related or database-related.

- ✅ **If `/admin/test` works**: The issue is likely with the database setup or environment variables
- ❌ **If `/admin/test` also gives 404**: The issue is with the development server setup

## Solution Steps

### Step 1: Verify Development Server Setup

1. **Start the development server properly:**
   ```bash
   cd C:\Users\ezekiel.haruna\portfolio-website
   npm install
   npm run dev
   ```

2. **Check the server is running:**
   - Look for a message like "Local: http://localhost:3000" or similar
   - Make sure no other process is using the same port

3. **Access the correct URL:**
   - If server runs on port 3000: `http://localhost:3000/admin`
   - If server runs on another port: `http://localhost:[PORT]/admin`

### Step 2: Test Basic Routing

1. **Try the test route first:**
   - Navigate to `http://localhost:3000/admin/test`
   - This bypasses database dependencies

2. **If test route works:**
   - The routing is correctly configured
   - Proceed to Step 3 (Database Setup)

3. **If test route doesn't work:**
   - Check for TypeScript/compilation errors in the terminal
   - Clear browser cache and try again
   - Try a hard refresh (Ctrl+F5)

### Step 3: Database Setup (Required for /admin)

The main `/admin` route requires a properly configured Supabase database.

1. **Check environment variables:**
   ```bash
   # Verify .env.local exists and contains:
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Set up Supabase:**
   - Create account at [supabase.com](https://supabase.com)
   - Create a new project
   - Go to Settings > API to get your URL and anon key
   - Update `.env.local` with real credentials

3. **Run database schema:**
   - In Supabase dashboard, go to SQL Editor
   - Run the complete `database-schema.sql` file

4. **Restart the development server:**
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

### Step 4: Troubleshoot Specific Errors

#### Error: "Missing Supabase environment variables"
- **Cause**: `.env.local` file is missing or incomplete
- **Solution**: Create/update `.env.local` with proper credentials
- **Note**: File must be in project root, not in src/

#### Error: "Failed to fetch projects"
- **Cause**: Database not set up or RLS policies blocking access
- **Solution**: Run database-schema.sql in Supabase SQL Editor

#### Error: Component compilation errors
- **Cause**: TypeScript type mismatches or import issues
- **Solution**: Check terminal output for specific error details

### Step 5: Alternative Routes for Testing

While setting up the database, you can test these routes:

- `/admin/test` - Test route without database dependencies
- `/admin/project/new` - Project form (will error on submit without DB)
- `/admin/profile` - Profile settings (will error on load without DB)

## Common Issues and Solutions

### Issue: Hard refresh required for route changes
**Solution**: This is normal in development. React Router handles client-side routing.

### Issue: "Cannot GET /admin" in production
**Solution**: Configure your hosting provider to serve index.html for all routes (SPA fallback).

### Issue: Styles not loading correctly
**Solution**: 
1. Check if Tailwind CSS is properly configured
2. Ensure all imports are using the correct paths
3. Clear browser cache

### Issue: Components not found errors
**Solution**:
1. Verify all UI components exist in `src/components/ui/`
2. Check that the component imports use the correct paths
3. Run `npm install` to ensure all dependencies are installed

## Verification Checklist

Before reporting issues, verify:

- [ ] Development server is running without errors
- [ ] `/admin/test` route works
- [ ] `.env.local` exists and has correct format
- [ ] No TypeScript compilation errors in terminal
- [ ] Browser console shows no JavaScript errors
- [ ] Using correct localhost URL and port

## Need Help?

If you're still experiencing issues:

1. **Check the browser console** (F12) for error messages
2. **Check the terminal** where the dev server is running for errors
3. **Try the test route** `/admin/test` to isolate the issue
4. **Verify all files exist** as listed in the implementation

## Quick Test Commands

```bash
# Navigate to project directory
cd C:\Users\ezekiel.haruna\portfolio-website

# Install dependencies (if not done)
npm install

# Start development server
npm run dev

# In browser, test these URLs:
# http://localhost:3000/
# http://localhost:3000/admin/test
# http://localhost:3000/admin (after DB setup)
```

The backend implementation is complete and should work once the environment is properly set up!