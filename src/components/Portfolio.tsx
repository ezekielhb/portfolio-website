import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  featured: boolean;
}

export default function Portfolio() {
  const navigate = useNavigate();

  const projects: Project[] = [
    {
      id: 'fintech-dashboard',
      title: 'FinTech Dashboard',
      description: 'A comprehensive financial dashboard for investment tracking and portfolio management.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tags: ['Dashboard', 'FinTech', 'Web App'],
      category: 'SaaS',
      featured: true
    },
    {
      id: 'food-delivery-app',
      title: 'Food Delivery Mobile App',
      description: 'End-to-end mobile app design for a local food delivery service with real-time tracking.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
      tags: ['Mobile App', 'Food Tech', 'iOS/Android'],
      category: 'Mobile App',
      featured: true
    },
    {
      id: 'healthcare-platform',
      title: 'Healthcare Management Platform',
      description: 'Patient management system for healthcare providers with appointment scheduling and medical records.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      tags: ['Healthcare', 'Platform', 'Web App'],
      category: 'SaaS',
      featured: false
    },
    {
      id: 'ecommerce-redesign',
      title: 'E-commerce Redesign',
      description: 'Complete UX overhaul of an online fashion retailer, increasing conversion rates by 40%.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      tags: ['E-commerce', 'Redesign', 'Conversion'],
      category: 'Website',
      featured: true
    },
    {
      id: 'productivity-app',
      title: 'Productivity & Task Management',
      description: 'Cross-platform productivity app with team collaboration and project management features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      tags: ['Productivity', 'Collaboration', 'Cross-platform'],
      category: 'Mobile App',
      featured: false
    },
    {
      id: 'learning-platform',
      title: 'Online Learning Platform',
      description: 'Educational platform design with interactive courses, progress tracking, and community features.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      tags: ['Education', 'Learning', 'Platform'],
      category: 'SaaS',
      featured: false
    }
  ];

  const handleViewCaseStudy = (projectId: string) => {
    navigate(`/case-study/${projectId}`);
  };

  return (
    <section id="portfolio" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A selection of my recent work showcasing user-centered design solutions across various industries and platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white dark:bg-slate-900"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-cyan-500 hover:bg-cyan-600 text-white">
                    Featured
                  </Badge>
                )}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-950 p-0 h-auto font-medium"
                  onClick={() => handleViewCaseStudy(project.id)}
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 font-medium transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}