import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductsShowcase from "@/components/ProductsShowcase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../profileImage/ajayLogo.jpg"; // Adjust the path as necessary

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ProductsShowcase />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span className="gradient-primary bg-clip-text text-transparent bg-white px-4 py-2 rounded-xl inline-block shadow-md text-white">
                Ajay Traders
              </span>
              ?
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to providing the highest quality products with
              exceptional customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "✓",
                title: "Certified Quality",
                description:
                  "All products are ISI certified and tested for accuracy and durability.",
              },
              {
                icon: "⚡",
                title: "Fast Delivery",
                description:
                  "Quick delivery across Jaunpur and surrounding areas within 24-48 hours.",
              },
              {
                icon: "🛠️",
                title: "Expert Support",
                description:
                  "Technical support and maintenance services by our skilled technicians.",
              },
              {
                icon: "💰",
                title: "Best Prices",
                description:
                  "Competitive pricing with flexible payment options and warranties.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">{feature.icon}</span>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today for personalized recommendations and competitive
              pricing.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Call Us</div>
                  <div className="text-sm opacity-90">
                    <a href="tel:+919889974041" className="hover:underline">
                      9889974041
                    </a>{" "}
                    /{" "}
                    <a href="tel:+919118826715" className="hover:underline">
                      9118826715
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Email Us</div>
                  <div className="text-sm opacity-90">
                    <a
                      href="mailto:ajaytred34@gmail.com"
                      className="hover:underline"
                    >
                      ajaytred34@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Visit Us</div>
                  <a
                    href="https://maps.app.goo.gl/N9n46yPtYWFDjUW69"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm opacity-90 hover:underline text-white"
                  >
                    Jaunpur, UP - 222143
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="hover:scale-105 transition-transform"
              >
                <a href="tel:+919889974041" className="w-full">
                  Call Now: 9889974041
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:scale-105 transition-transform bg-white text-primary hover:bg-gray-200 text-black"
              >
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={logo} // Replace this path with your actual image path
                    alt="Ajay Traders Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-lg">Ajay Traders</span>
              </div>

              <p className="text-gray-400 text-sm">
                Your trusted partner for quality weighing scales and flour mills
                in Jaunpur.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <NavLink
                    to="/products"
                    className="hover:text-white transition-colors"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/faqs"
                    className="hover:text-white transition-colors"
                  >
                    FAQs
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>GoldField Scales</li>
                <li>Jeevan Deep Mills</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>📞 9889974041 / 9118826715</div>
                <div>📧 ajaytred34@gmail.com</div>
                <div>
                  📍 Village Ramgarh Machhali Shahar, Barshathi Road, Bandhawa
                  Market, Jaunpur, UP - 222143
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 Ajay Traders. All rights reserved. | Developed and Managed by Mr.
              Anis Khan ( Mumbai ) Contact no : <a href="tel:+918779530570" className="text-white hover:underline">8779530570</a> email: <a href="mailto:aniskhan20171@gmail.com" className="text-white hover:underline">aniskhan20171@gmail.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
