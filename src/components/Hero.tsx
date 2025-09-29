import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';

export default function Hero() {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-800 to-cyan-600 bg-clip-text text-transparent leading-tight">
            Alex Chen
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
            UI/UX Designer
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Crafting intuitive digital experiences that bridge the gap between user needs and business goals through thoughtful design and research.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Button 
            onClick={scrollToPortfolio}
            size="lg" 
            className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            View My Work
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            onClick={scrollToContact}
            variant="outline" 
            size="lg" 
            className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Contact Me
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            className="text-slate-600 hover:text-blue-800 px-8 py-3 text-lg font-medium transition-all duration-300"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Resume
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-slate-400" />
        </div>
      </div>
    </section>
  );
}