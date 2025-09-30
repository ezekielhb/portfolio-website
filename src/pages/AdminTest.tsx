import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminTest() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Test Page</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Testing route and component structure
              </p>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Admin Route Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              If you can see this page, the routing is working correctly!
            </p>
            
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button 
                  onClick={() => navigate('/admin')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Go to Full Admin (Database Required)
                </Button>
                <Button 
                  onClick={() => navigate('/admin/project/new')}
                  variant="outline"
                >
                  Test Project Form
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <Button 
                  onClick={() => navigate('/admin/profile')}
                  variant="outline"
                >
                  Profile Settings
                </Button>
                <Button 
                  onClick={() => navigate('/admin/testimonials')}
                  variant="outline"
                >
                  Testimonials
                </Button>
                <Button 
                  onClick={() => navigate('/admin/contact')}
                  variant="outline"
                >
                  Contact Settings
                </Button>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-green-700 dark:text-green-300">
                <li>Set up your Supabase database</li>
                <li>Update .env.local with your credentials</li>
                <li>Run the database schema SQL</li>
                <li>Test the full admin interface</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}