import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import profileImage from '@/assets/profile-image.jpg';

export default function About() {
  const skills = [
    'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator',
    'UX Research', 'User Testing', 'Prototyping', 'Wireframing',
    'Design Systems', 'HTML/CSS', 'React', 'Accessibility'
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 p-2 shadow-2xl">
                <img 
                  src={profileImage} 
                  alt="Abel Barde - UI/UX Designer"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-600 rounded-full opacity-20 animate-pulse delay-1000"></div>
              
              {/* Floating Skills Icons */}
              <div className="absolute top-8 -left-8 w-12 h-12 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center animate-bounce delay-500">
                <span className="text-2xl">🎨</span>
              </div>
              <div className="absolute bottom-8 -right-8 w-12 h-12 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center animate-bounce delay-1000">
                <span className="text-2xl">💡</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                About Me
              </h2>
              <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  I'm a passionate UI/UX Designer with over 5 years of experience creating digital experiences that users love. My approach combines user-centered design principles with business objectives to deliver solutions that are both beautiful and functional.
                </p>
                <p>
                  I believe great design is invisible – it should feel natural and intuitive. My process always starts with understanding the user's needs through research and testing, then crafting interfaces that make complex tasks feel simple.
                </p>
                <p>
                  When I'm not designing, you'll find me exploring the latest design trends, contributing to open-source projects, or mentoring aspiring designers in the community.
                </p>
              </div>
            </div>

            {/* Design Philosophy */}
            <Card className="border-2 border-blue-100 dark:border-blue-900 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  My Design Philosophy
                </h3>
                <p className="text-blue-800 dark:text-blue-200 italic">
                  "Good design is not just how it looks and feels. Good design is how it works. Every pixel should have a purpose, every interaction should feel natural, and every user should feel empowered."
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Skills & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200 px-3 py-1 text-sm"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}