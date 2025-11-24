import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-royal-blue-600 to-bright-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AT</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">Ajay Traders</h3>
                <p className="text-sm text-gray-400">Quality Products Since Years</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in quality weighing solutions and flour mills in Jaunpur, Uttar Pradesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Products</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">GoldField Weighing Scales</li>
              <li className="text-gray-300 text-sm">Jeevan Deep Flour Mills</li>
              <li className="text-gray-300 text-sm">Electronic Scales</li>
              <li className="text-gray-300 text-sm">Home Appliances</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-royal-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Village Ramgarh Machhali Shahar, Barshathi Road, Bandhawa Market, Jaunpur - 222143
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-royal-blue-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <a href="tel:+919889974041" className="hover:text-white transition-colors">9889974041</a>
                  <span className="mx-1">/</span>
                  <a href="tel:+919118826715" className="hover:text-white transition-colors">9118826715</a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-royal-blue-400 flex-shrink-0" />
                <a href="mailto:ajaytred34@gmail.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                  ajaytred34@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="font-semibold text-sm mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 hover:bg-royal-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Ajay Traders. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/faqs" className="text-gray-400 hover:text-white transition-colors duration-200">
                FAQs
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
