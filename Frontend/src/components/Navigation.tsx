import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../profileImage/ajayLogo.jpg"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with contact info */}
        {/* <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-600">
              <Phone className="w-3 h-3" />
              <span>9889974041 / 9118826715</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Mail className="w-3 h-3" />
              <span>ajaytred34@gmail.com</span>
            </div>
          </div>
          <div className="hidden sm:block text-gray-600">
            Village Ramgarh Machhali Shahar, Jaunpur, UP - 222143
          </div>
        </div> */}

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={logo} // Replace with actual image path
                alt="Ajay Traders Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Ajay Traders</h1>
              <p className="text-xs text-gray-500">Quality & Trust</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? "text-primary" : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <a href="tel:+919889974041" className="w-full">
                Call Now
              </a>
            </Button>
            <Button size="sm" className="gradient-primary text-white">
              <a
                href="https://wa.me/919889974041"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                WhatsApp Chat
              </a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive(item.path) ? "text-primary" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    <a href="tel:+919889974041" className="w-full">
                      Call Now
                    </a>
                  </Button>
                  <Button className="w-full gradient-primary text-white">
                    <a
                      href="https://wa.me/919889974041"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      WhatsApp Chat
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
