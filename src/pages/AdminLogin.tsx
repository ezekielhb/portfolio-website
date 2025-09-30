
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const envPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    if (password === envPass) {
      // set a simple token in localStorage (expires when user clears storage)
      localStorage.setItem('admin_logged_in', 'true');
      toast.success('Logged in');
      navigate('/admin');
    } else {
      toast.error('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
