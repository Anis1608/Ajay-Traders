
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock auth state - replace with actual auth later
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Order Now', path: '/order' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-royal-blue-600 to-bright-red-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg lg:text-xl">AT</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-poppins font-bold text-lg lg:text-xl text-royal-blue-800">
                Ajay Traders
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Quality Products Since Years</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "font-inter font-medium transition-all duration-300 relative group",
                  location.pathname === item.path
                    ? "text-royal-blue-600"
                    : "text-gray-700 hover:text-royal-blue-600"
                )}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-royal-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Auth & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* WhatsApp Quick Contact */}
            <a
              href="https://wa.me/919889974041"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors duration-300"
            >
              <span className="text-sm font-medium">WhatsApp</span>
            </a>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button 
                    variant="outline" 
                    className="border-royal-blue-600 text-royal-blue-600 hover:bg-royal-blue-600 hover:text-white"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={handleLogout}
                  className="bg-bright-red-600 hover:bg-bright-red-700 text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" className="hidden lg:block">
                <Button className="bg-gradient-to-r from-royal-blue-600 to-royal-blue-700 hover:from-royal-blue-700 hover:to-royal-blue-800 text-white">
                  Admin Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-royal-blue-600 transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 animate-slide-in-right">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300",
                    location.pathname === item.path
                      ? "text-royal-blue-600 bg-royal-blue-50"
                      : "text-gray-700 hover:text-royal-blue-600 hover:bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-royal-blue-600 font-medium"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-bright-red-600 font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-royal-blue-600 font-medium"
                  >
                    Admin Login
                  </Link>
                )}
                
                {/* Mobile WhatsApp */}
                <a
                  href="https://wa.me/919889974041"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-green-600 font-medium"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
