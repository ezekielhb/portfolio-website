import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Clock, Users, TrendingUp } from 'lucide-react';

interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  overview: string;
  problem: string;
  process: string[];
  solution: string;
  results: string[];
  images: string[];
  tags: string[];
  duration: string;
  team: string;
  impact: string;
}

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock case study data - in a real app, this would come from an API or database
  const caseStudyData: Record<string, CaseStudyData> = {
    'fintech-dashboard': {
      id: 'fintech-dashboard',
      title: 'FinTech Dashboard',
      subtitle: 'Revolutionizing Investment Portfolio Management',
      heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
      overview: 'A comprehensive financial dashboard designed to help investors track their portfolios, analyze market trends, and make informed investment decisions. The platform needed to handle complex financial data while maintaining an intuitive user experience.',
      problem: 'Existing financial platforms were either too complex for average investors or lacked the depth that serious traders needed. Users struggled with information overload, poor data visualization, and unclear navigation paths.',
      process: [
        'User Research & Interviews with 25+ investors',
        'Competitive Analysis of 10+ financial platforms',
        'Information Architecture & User Flow Design',
        'Low-fidelity Wireframing & Prototyping',
        'High-fidelity UI Design & Design System',
        'Usability Testing with 15 participants',
        'Developer Handoff & Implementation Support'
      ],
      solution: 'Created a clean, data-driven dashboard that prioritizes the most important information while providing easy access to detailed analytics. Implemented progressive disclosure to reduce cognitive load and designed custom data visualizations for better comprehension.',
      results: [
        '45% increase in user engagement',
        '60% reduction in task completion time',
        '92% user satisfaction score',
        '30% increase in daily active users'
      ],
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop'
      ],
      tags: ['Dashboard', 'FinTech', 'Web App', 'Data Visualization'],
      duration: '3 months',
      team: '1 Designer, 2 Developers, 1 PM',
      impact: '45% increase in user engagement'
    },
    'food-delivery-app': {
      id: 'food-delivery-app',
      title: 'Food Delivery Mobile App',
      subtitle: 'Connecting Local Restaurants with Hungry Customers',
      heroImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=600&fit=crop',
      overview: 'A mobile-first food delivery application designed to connect local restaurants with customers. The app needed to provide seamless ordering, real-time tracking, and an engaging user experience for both customers and restaurant partners.',
      problem: 'Local restaurants struggled to compete with major delivery platforms due to high commission fees. Customers wanted a more personalized experience with local favorites, but existing solutions were generic and impersonal.',
      process: [
        'Market Research & Customer Journey Mapping',
        'Restaurant Partner Interviews',
        'Mobile-first Design Strategy',
        'Wireframing & User Flow Optimization',
        'Interactive Prototyping',
        'Usability Testing across iOS & Android',
        'Design System Creation for Scalability'
      ],
      solution: 'Designed a community-focused app that highlights local restaurants and their stories. Implemented features like restaurant discovery, personalized recommendations, real-time order tracking, and a loyalty program to encourage repeat usage.',
      results: [
        '200+ restaurant partnerships in first 6 months',
        '4.8/5 app store rating',
        '40% month-over-month user growth',
        '25% higher order frequency vs competitors'
      ],
      images: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=500&fit=crop'
      ],
      tags: ['Mobile App', 'Food Tech', 'iOS/Android', 'Real-time'],
      duration: '4 months',
      team: '2 Designers, 3 Developers, 1 PM',
      impact: '200+ restaurant partnerships'
    }
  };

  const caseStudy = caseStudyData[id || ''] || caseStudyData['fintech-dashboard'];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src={caseStudy.heroImage} 
          alt={caseStudy.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-5xl font-bold mb-4">{caseStudy.title}</h1>
            <p className="text-xl opacity-90">{caseStudy.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Project Details */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Duration</h3>
              <p className="text-slate-600 dark:text-slate-400">{caseStudy.duration}</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Team</h3>
              <p className="text-slate-600 dark:text-slate-400">{caseStudy.team}</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Impact</h3>
              <p className="text-slate-600 dark:text-slate-400">{caseStudy.impact}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {caseStudy.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Overview</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {caseStudy.overview}
          </p>
        </section>

        {/* Problem Statement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">The Problem</h2>
          <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950 border-0">
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {caseStudy.problem}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Design Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Design Process</h2>
          <div className="space-y-4">
            {caseStudy.process.map((step, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                <p className="text-slate-700 dark:text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solution */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">The Solution</h2>
          <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950 border-0">
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                {caseStudy.solution}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Screenshots */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Key Screenshots</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudy.images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={image} 
                  alt={`${caseStudy.title} screenshot ${index + 1}`}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Results & Impact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudy.results.map((result, index) => (
              <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {result.split(' ')[0]}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    {result.split(' ').slice(1).join(' ')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
          >
            View More Projects
          </Button>
        </div>
      </div>
    </div>
  );
}