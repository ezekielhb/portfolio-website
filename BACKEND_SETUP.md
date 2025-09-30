# Portfolio Backend Setup Guide

This guide will help you set up the Supabase backend for your portfolio project management system.

## 🚀 Quick Setup

### 1. Create Supabase Account

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - Name: `portfolio-backend`
   - Database Password: Generate a strong password
   - Region: Choose closest to your users

### 2. Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the sidebar
3. Click "New Query"
4. Copy the contents of `database-schema.sql` and paste it
5. Click "Run" to execute the schema

This will create:
- `projects` table with all required fields
- Row Level Security (RLS) policies
- Indexes for better performance
- Sample data (2 projects)

### 3. Configure Environment Variables

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy your project details
3. Update your `.env.local` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   - `/admin` - Admin dashboard
   - `/admin/project/new` - Create new project
   - `/` - View your portfolio (should show projects from database)

## 📋 Features Included

### Admin Dashboard (`/admin`)
- ✅ **Project Management**: View all projects with search and filtering
- ✅ **Quick Actions**: Edit, Delete, Feature, Publish/Unpublish
- ✅ **Statistics**: Total projects, published, featured, and drafts count
- ✅ **Status Indicators**: Visual badges for project status

### Project Form (`/admin/project/new` & `/admin/project/edit/:id`)
- ✅ **Comprehensive Form**: All project fields including case study content
- ✅ **Dynamic Fields**: Add/remove tags, process steps, results, and images
- ✅ **Real-time Preview**: Preview projects while editing
- ✅ **Validation**: Required fields and form validation

### Frontend Integration
- ✅ **Dynamic Portfolio**: Portfolio section loads from database
- ✅ **Case Studies**: Individual project pages with full content
- ✅ **Fallback Data**: Graceful fallback to hardcoded data if database is unavailable
- ✅ **Loading States**: Proper loading and error handling

## 🎨 Design System Maintained

The backend interface uses your existing design system:
- **Colors**: Blue/Cyan/Slate color palette maintained
- **Components**: Same Card, Button, Badge components
- **Typography**: Consistent fonts and sizes
- **Dark Mode**: Full dark mode support
- **Responsive**: Mobile-friendly design

## 🔒 Security Features

### Row Level Security (RLS)
- **Public Access**: Only published projects visible to public
- **Admin Access**: Full access for authenticated users
- **Data Protection**: Unpublished projects are private

### Environment Variables
- **Secure Keys**: API keys stored in environment variables
- **Client-Side Safety**: Only public keys exposed to client

## 📊 Database Schema

### Projects Table Structure
```sql
- id (UUID, Primary Key)
- title (Text, Required)
- subtitle (Text, Optional)
- description (Text, Required)
- hero_image (Text, Required)
- image (Text, Required)
- images (Text Array)
- tags (Text Array)
- category (Text, Required)
- featured (Boolean)
- overview (Text, Required)
- problem (Text, Required)
- process (Text Array)
- solution (Text, Required)
- results (Text Array)
- duration (Text, Required)
- team (Text, Required)
- impact (Text, Required)
- live_url (Text, Optional)
- github_url (Text, Optional)
- published (Boolean)
- created_at (Timestamp)
- updated_at (Timestamp)
```

## 🚀 Deployment to Vercel

Your project is already configured for Vercel deployment:

1. **Push to Git**: Commit all your changes
2. **Environment Variables**: In Vercel dashboard, add:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. **Deploy**: Vercel will automatically deploy

## 📝 Usage Workflow

### Creating Projects
1. Go to `/admin`
2. Click "New Project"
3. Fill in all required fields
4. Add tags, process steps, and results dynamically
5. Toggle "Featured" and "Published" status
6. Save project

### Managing Projects
- **Edit**: Click "Edit" button on any project
- **Delete**: Click "Delete" button (with confirmation)
- **Feature/Unfeature**: Toggle featured status
- **Publish/Unpublish**: Toggle published status
- **Preview**: View how project appears on live site

### Viewing Projects
- **Portfolio**: Shows only featured, published projects
- **Case Study**: Individual project pages with full content
- **Admin**: Shows all projects regardless of status

## 🔧 Customization Options

### Adding New Fields
1. Update `database-schema.sql` to add new columns
2. Update `src/types/project.ts` interfaces
3. Update `ProjectForm.tsx` to include new fields
4. Update `ProjectService.ts` if needed

### Custom Validation
- Modify form validation in `ProjectForm.tsx`
- Add database constraints in schema
- Implement business logic in `ProjectService.ts`

### UI Customization
- All components use your existing design system
- Colors and styling can be modified in Tailwind classes
- Components are fully customizable

## 🐛 Troubleshooting

### Database Connection Issues
1. Check Supabase project URL and API key
2. Verify environment variables are set correctly
3. Ensure RLS policies are properly configured

### Build Errors
1. Verify all imports are correct
2. Check TypeScript types match database schema
3. Ensure all required environment variables are set

### Authentication Issues
1. For admin features, you may need to implement Supabase Auth
2. Current setup uses public access for simplicity
3. Add authentication as needed for production

## 📚 Next Steps

### Optional Enhancements
1. **Authentication**: Add Supabase Auth for admin protection
2. **Image Upload**: Integrate Supabase Storage for image management
3. **Categories**: Make categories dynamic from database
4. **Analytics**: Track project views and engagement
5. **Comments**: Add commenting system for projects

### Production Considerations
1. **Backup**: Set up automated database backups
2. **Monitoring**: Monitor database performance and usage
3. **Scaling**: Consider read replicas for high traffic
4. **Security**: Review and tighten RLS policies

---

## 🎉 You're Ready!

Your portfolio now has a complete backend management system that:
- ✅ Maintains your existing beautiful design
- ✅ Provides full CRUD operations for projects
- ✅ Generates dynamic case study pages
- ✅ Works seamlessly with Vercel deployment
- ✅ Scales with your growing portfolio

**Admin URL**: `https://your-portfolio.vercel.app/admin`

Happy project managing! 🚀