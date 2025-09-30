import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import CaseStudy from './pages/CaseStudy';
import Admin from './pages/Admin';
import ProjectForm from './pages/ProjectForm';
import AdminLogin from './pages/AdminLogin';
import ProfileSettings from './pages/ProfileSettings';
import TestimonialManagement from './pages/TestimonialManagement';
import ContactSettings from './pages/ContactSettings';
import AdminTest from './pages/AdminTest';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/project/new" element={<ProjectForm />} />
          <Route path="/admin/project/edit/:id" element={<ProjectForm />} />
          <Route path="/admin/profile" element={<ProfileSettings />} />
          <Route path="/admin/testimonials" element={<TestimonialManagement />} />
          <Route path="/admin/contact" element={<ContactSettings />} />
          <Route path="/admin/test" element={<AdminTest />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/login" element={<AdminLogin />} />
</Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;