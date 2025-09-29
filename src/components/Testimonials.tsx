import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechFlow Inc.',
      content: 'Alex delivered an exceptional design that exceeded our expectations. The user research was thorough, and the final product increased our user engagement by 45%. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'CEO',
      company: 'StartupXYZ',
      content: 'Working with Alex was a game-changer for our startup. The mobile app design was intuitive, modern, and our users love it. The attention to detail and user experience is outstanding.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'Digital Solutions Co.',
      content: 'Alex transformed our outdated website into a modern, conversion-focused platform. The design process was collaborative, and the results speak for themselves - 60% increase in conversions!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      id: '4',
      name: 'David Park',
      role: 'CTO',
      company: 'HealthTech Solutions',
      content: 'The healthcare platform design Alex created is both beautiful and functional. The user flow is seamless, and our medical professionals find it incredibly easy to use. Exceptional work!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            What Clients Say
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-950"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-800"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
            <div className="text-slate-600 dark:text-slate-400">Projects Completed</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">98%</div>
            <div className="text-slate-600 dark:text-slate-400">Client Satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5+</div>
            <div className="text-slate-600 dark:text-slate-400">Years Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">25+</div>
            <div className="text-slate-600 dark:text-slate-400">Happy Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}