import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowDown, Link } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 overflow-hidden">
      {/* Background elements - fixed with pointer-events-none */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float animate-delay-1000 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Content */}
          <div className="space-y-8 animate-slide-in-left select-text relative z-20">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="gradient-primary bg-clip-text text-transparent p-2 bg-white rounded-xl inline-block shadow-md text-white">
                  Ajay Traders
                </span>
                <br />
                <span className="text-2xl md:text-3xl text-gray-600 mt-2 block">
                  Precision & Quality Since Day One
                </span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed select-text">
                Your trusted partner for high-quality electronic weighing scales and domestic flour mills. 
                Serving Jaunpur and surrounding areas with exceptional products and service.
              </p>
            </div>
            
            {/* Buttons - fixed for interaction */}
            <div className="flex flex-col sm:flex-row gap-4 z-20">
              <Button
                size="lg"
                className="w-full gradient-primary text-white hover:scale-105 transition-transform active:scale-95"
                asChild
              >
               <NavLink to={"/products"} className="w-full">
                  View Our Products
                </NavLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full hover:bg-gray-200 hover:scale-105 transition-transform active:scale-95"
                asChild
              >
                <a href="tel:+919889974041" className="w-full">
                  Call Now: 9889974041
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4 select-text">
              <div className="text-center animate-bounce-in animate-delay-300">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center animate-bounce-in animate-delay-500">
                <div className="text-2xl font-bold text-secondary">5+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center animate-bounce-in animate-delay-700">
                <div className="text-2xl font-bold text-accent">50+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
            </div>
          </div>

          {/* Right side - Product Showcase */}
          <div className="relative animate-slide-in-right z-10">
            <div className="grid grid-cols-2 gap-6">
              {/* Gold Field Card */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up animate-delay-200 cursor-pointer">
                <div className="space-y-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center animate-pulse-slow">
                    <span className="text-white font-bold">⚖️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">GoldField</h3>
                    <p className="text-sm text-gray-600">Electronic Weighing Scales</p>
                  </div>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Various capacities</li>
                    <li>• Stainless steel platform</li>
                    <li>• Digital display</li>
                    <li>• Ideal for industrial and retail use</li>
                  </ul>
                </div>
              </Card>

              {/* Jeevan Deep Card */}
              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 mt-8 animate-fade-in-up animate-delay-500 cursor-pointer">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center animate-pulse-slow animate-delay-1000">
                    <span className="text-white font-bold">🌾</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Jeevan Deep</h3>
                    <p className="text-sm text-gray-600">Flour Mills (Chakki)</p>
                  </div>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Domestic atta chakki</li>
                    <li>• Heavy Duty Motor</li>
                    <li>• Space-saving design</li>
                  </ul>
                </div>
              </Card>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float animate-delay-500 pointer-events-none"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float animate-delay-2000 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;