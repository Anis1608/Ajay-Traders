import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;


  if (localStorage.getItem('token')) {
    navigate('/admin/dashboard');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      toast({
        title: "Login Successful!",
        description: "Welcome to Ajay Traders Admin Panel.",
      });
      
      // Store token and login state
      localStorage.setItem('token', data.token);
      // localStorage.setItem('isLoggedIn', 'true');
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50 via-white to-bright-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-r from-royal-blue-600 to-bright-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">AT</span>
            </div>
            <div>
              <h1 className="font-poppins font-bold text-2xl text-royal-blue-800">
                Ajay Traders
              </h1>
              <p className="text-sm text-gray-600">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="font-poppins font-bold text-2xl text-royal-blue-800">
              Admin Login
            </CardTitle>
            <CardDescription className="font-inter text-gray-600">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-inter font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 font-inter border-gray-300 focus:border-royal-blue-500 focus:ring-royal-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-inter font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 font-inter border-gray-300 focus:border-royal-blue-500 focus:ring-royal-blue-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-royal-blue-600 to-royal-blue-700 hover:from-royal-blue-700 hover:to-royal-blue-800 text-white font-semibold text-lg shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;