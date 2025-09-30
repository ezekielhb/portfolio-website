-- Portfolio Projects Table Schema for Supabase
-- Run this in your Supabase SQL Editor to create the projects table

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  overview TEXT NOT NULL,
  problem TEXT NOT NULL,
  process TEXT[] DEFAULT '{}',
  solution TEXT NOT NULL,
  results TEXT[] DEFAULT '{}',
  duration TEXT NOT NULL,
  team TEXT NOT NULL,
  impact TEXT NOT NULL,
  live_url TEXT,
  github_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow read access to published projects for everyone
CREATE POLICY "Allow public read access to published projects"
ON projects FOR SELECT
USING (published = true);

-- Allow full access to authenticated users (for admin)
-- You can modify this based on your authentication needs
CREATE POLICY "Allow full access for authenticated users"
ON projects FOR ALL
TO authenticated
USING (true);

-- Insert some sample data (optional)
INSERT INTO projects (
  title,
  subtitle,
  description,
  hero_image,
  image,
  images,
  tags,
  category,
  featured,
  overview,
  problem,
  process,
  solution,
  results,
  duration,
  team,
  impact,
  published
) VALUES 
(
  'FinTech Dashboard',
  'Revolutionizing Investment Portfolio Management',
  'A comprehensive financial dashboard for investment tracking and portfolio management.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop'
  ],
  ARRAY['Dashboard', 'FinTech', 'Web App', 'Data Visualization'],
  'SaaS',
  true,
  'A comprehensive financial dashboard designed to help investors track their portfolios, analyze market trends, and make informed investment decisions. The platform needed to handle complex financial data while maintaining an intuitive user experience.',
  'Existing financial platforms were either too complex for average investors or lacked the depth that serious traders needed. Users struggled with information overload, poor data visualization, and unclear navigation paths.',
  ARRAY[
    'User Research & Interviews with 25+ investors',
    'Competitive Analysis of 10+ financial platforms',
    'Information Architecture & User Flow Design',
    'Low-fidelity Wireframing & Prototyping',
    'High-fidelity UI Design & Design System',
    'Usability Testing with 15 participants',
    'Developer Handoff & Implementation Support'
  ],
  'Created a clean, data-driven dashboard that prioritizes the most important information while providing easy access to detailed analytics. Implemented progressive disclosure to reduce cognitive load and designed custom data visualizations for better comprehension.',
  ARRAY[
    '45% increase in user engagement',
    '60% reduction in task completion time',
    '92% user satisfaction score',
    '30% increase in daily active users'
  ],
  '3 months',
  '1 Designer, 2 Developers, 1 PM',
  '45% increase in user engagement',
  true
),
(
  'Food Delivery Mobile App',
  'Connecting Local Restaurants with Hungry Customers',
  'End-to-end mobile app design for a local food delivery service with real-time tracking.',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=500&fit=crop'
  ],
  ARRAY['Mobile App', 'Food Tech', 'iOS/Android', 'Real-time'],
  'Mobile App',
  true,
  'A mobile-first food delivery application designed to connect local restaurants with customers. The app needed to provide seamless ordering, real-time tracking, and an engaging user experience for both customers and restaurant partners.',
  'Local restaurants struggled to compete with major delivery platforms due to high commission fees. Customers wanted a more personalized experience with local favorites, but existing solutions were generic and impersonal.',
  ARRAY[
    'Market Research & Customer Journey Mapping',
    'Restaurant Partner Interviews',
    'Mobile-first Design Strategy',
    'Wireframing & User Flow Optimization',
    'Interactive Prototyping',
    'Usability Testing across iOS & Android',
    'Design System Creation for Scalability'
  ],
  'Designed a community-focused app that highlights local restaurants and their stories. Implemented features like restaurant discovery, personalized recommendations, real-time order tracking, and a loyalty program to encourage repeat usage.',
  ARRAY[
    '200+ restaurant partnerships in first 6 months',
    '4.8/5 app store rating',
    '40% month-over-month user growth',
    '25% higher order frequency vs competitors'
  ],
  '4 months',
  '2 Designers, 3 Developers, 1 PM',
  '200+ restaurant partnerships',
  true
);

-- Profile Settings Table
CREATE TABLE IF NOT EXISTS profile_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  profile_image TEXT NOT NULL,
  hero_image TEXT,
  location TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  resume TEXT,
  social_links JSONB DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  experience TEXT NOT NULL,
  availability TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Settings Table
CREATE TABLE IF NOT EXISTS contact_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  social_links JSONB DEFAULT '{}',
  contact_form_webhook TEXT,
  auto_reply_enabled BOOLEAN DEFAULT FALSE,
  auto_reply_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_title TEXT NOT NULL,
  client_company TEXT NOT NULL,
  client_image TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  project_id UUID,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at triggers for new tables
CREATE TRIGGER update_profile_settings_updated_at
  BEFORE UPDATE ON profile_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_settings_updated_at
  BEFORE UPDATE ON contact_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for new tables
ALTER TABLE profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profile Settings
CREATE POLICY "Allow public read access to profile settings"
ON profile_settings FOR SELECT
USING (true);

CREATE POLICY "Allow full access to profile settings for authenticated users"
ON profile_settings FOR ALL
TO authenticated
USING (true);

-- RLS Policies for Contact Settings
CREATE POLICY "Allow public read access to contact settings"
ON contact_settings FOR SELECT
USING (true);

CREATE POLICY "Allow full access to contact settings for authenticated users"
ON contact_settings FOR ALL
TO authenticated
USING (true);

-- RLS Policies for Testimonials
CREATE POLICY "Allow public read access to published testimonials"
ON testimonials FOR SELECT
USING (published = true);

CREATE POLICY "Allow full access to testimonials for authenticated users"
ON testimonials FOR ALL
TO authenticated
USING (true);

-- Sample data for profile settings
INSERT INTO profile_settings (
  name,
  title,
  bio,
  profile_image,
  email,
  experience,
  availability,
  skills,
  social_links
) VALUES (
  'Your Name',
  'UI/UX Designer & Frontend Developer',
  'I''m a passionate designer and developer with expertise in creating beautiful, user-centered digital experiences. I specialize in modern web technologies and design systems.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  'hello@yourname.com',
  '5+ years',
  'Available for new projects',
  ARRAY['UI/UX Design', 'React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Adobe Creative Suite'],
  '{
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "dribbble": "https://dribbble.com/yourusername"
  }'
);

-- Sample testimonials
INSERT INTO testimonials (
  client_name,
  client_title,
  client_company,
  client_image,
  testimonial_text,
  rating,
  featured,
  published
) VALUES 
(
  'Sarah Johnson',
  'Product Manager',
  'TechCorp Inc.',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'Working with this designer was an absolute pleasure. They delivered exceptional work that exceeded our expectations and helped us achieve our product goals.',
  5,
  true,
  true
),
(
  'Michael Chen',
  'CEO',
  'StartupXYZ',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'The attention to detail and creative problem-solving skills were outstanding. Our user engagement increased significantly after the redesign.',
  5,
  true,
  true
),
(
  'Emily Davis',
  'Marketing Director',
  'Creative Agency',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'Professional, creative, and incredibly talented. The project was delivered on time and the results spoke for themselves.',
  5,
  false,
  true
);

-- Create indexes for better performance
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- Indexes for new tables
CREATE INDEX idx_testimonials_published ON testimonials(published);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at DESC);
