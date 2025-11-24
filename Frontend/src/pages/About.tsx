import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import photo from "../profileImage/ajayProfile.png";
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

const About = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-primary to-secondary py-20 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              About Ajay Traders
            </motion.h1>
            <motion.p 
              className="text-xl opacity-90 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isMounted ? { opacity: 0.9 } : {}}
              transition={{ delay: 0.6 }}
            >
              Your trusted partner in quality weighing solutions and flour mills (chakki) in Jaunpur, Uttar Pradesh.
              serving Jaunpur and surrounding areas with dedication and excellence.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Owner Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div className="space-y-6" variants={fadeInUp}>
              <div>
                <motion.div variants={fadeInUp}>
                  <Badge className="mb-4">Meet Our Founder</Badge>
                </motion.div>
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                  variants={fadeInUp}
                >
                  Mr. Ajay Yadav
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600 leading-relaxed mb-6"
                  variants={fadeInUp}
                >
                  With over 5 years of experience in the weighing scales and home appliances industry, 
                  Mr. Ajay Yadav founded Ajay Traders with a vision to provide high-quality products 
                  and exceptional customer service to the people of Jaunpur and surrounding areas.
                </motion.p>
                <motion.p 
                  className="text-lg text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                >
                  His commitment to quality and customer satisfaction has made Ajay Traders a trusted name 
                  in the region, serving over 500 satisfied customers with reliable products and 
                  professional service.
                </motion.p>
              </div>
              
              <motion.div 
                className="grid grid-cols-2 gap-6"
                variants={staggerContainer}
              >
                <motion.div 
                  className="text-center p-4 bg-gray-50 rounded-lg"
                  variants={fadeInUp}
                >
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-gray-50 rounded-lg"
                  variants={fadeInUp}
                >
                  <div className="text-2xl font-bold text-secondary mb-1">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div className="relative" variants={fadeIn}>
              <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <motion.div 
                    className="w-32 h-32 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isMounted ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                  >
                    <img
                      src={photo}
                      alt="Ajay Yadav"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900">Mr. Ajay Yadav</h3>
                  <p className="text-gray-600">Founder & Owner</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at Ajay Traders
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {[
              {
                icon: "🎯",
                title: "Quality First",
                description: "We never compromise on quality. Every product is carefully selected and tested to meet our high standards."
              },
              {
                icon: "🤝",
                title: "Customer Trust",
                description: "Building long-term relationships based on trust, transparency, and exceptional service."
              },
              {
                icon: "⚡",
                title: "Innovation",
                description: "Staying updated with the latest technology and bringing innovative solutions to our customers."
              },
              {
                icon: "💼",
                title: "Professionalism",
                description: "Maintaining the highest standards of professionalism in all our business dealings."
              }
            ].map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardHeader>
                    <motion.div 
                      className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-2xl">{value.icon}</span>
                    </motion.div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location & Service Area */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Location</h2>
              <div className="space-y-4 text-lg text-gray-600">
                <div className="flex items-start space-x-3">
                  <span className="text-primary mt-1">📍</span>
                  <div>
                    <div className="font-semibold text-gray-900">Complete Address:</div>
                    <div>Village Ramgarh Machhali Shahar</div>
                    <div>Barshathi Road, Bandhawa Market</div>
                    <div>Jaunpur, Uttar Pradesh - 222143</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-primary">📞</span>
                  <div>
                    <span className="font-semibold text-gray-900">Phone: </span>
                    9889974041 / 9118826715
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-primary">📧</span>
                  <div>
                    <span className="font-semibold text-gray-900">Email: </span>
                    ajaytred34@gmail.com
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Areas</h3>
                <motion.div 
                  className="flex flex-wrap gap-2"
                  variants={staggerContainer}
                >
                  {['Jaunpur', 'Varanasi', 'Azamgarh', 'Sultanpur', 'Pratapgarh', 'Allahabad'].map((area, index) => (
                    <motion.div key={area} variants={fadeInUp}>
                      <Badge variant="secondary" className="px-3 py-1">
                        {area}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative w-full h-96 rounded-2xl overflow-hidden"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Google Map Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.344542427664!2d82.65253667562425!3d26.79201977673559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3990383f292b6b85%3A0x9c9e46cbf12c2eeb!2sBandhawa%20Market%2C%20Jaunpur%2C%20Uttar%20Pradesh%20222143!5e0!3m2!1sen!2sin!4v1718602194030!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              ></iframe>

              {/* Overlay Text */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{
                      y: [0, -10, 0],
                      transition: { repeat: Infinity, duration: 3 }
                    }}
                  >
                    🗺️
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-1">Find Us</h3>
                  <p className="text-lg font-medium">Bandhawa Market, Jaunpur</p>
                  <p className="text-sm text-gray-200 mt-2 italic">Click map to open in Google Maps</p>
                </div>
              </div>

              {/* Transparent Link Layer */}
              <a
                href="https://maps.app.goo.gl/N9n46yPtYWFDjUW69"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-0 left-0 w-full h-full z-10"
              ></a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid md:grid-cols-2 gap-12"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ rotate: 15 }}
                  >
                    <span className="text-white text-xl">🎯</span>
                  </motion.div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    To provide high-quality weighing scales and flour mills to customers 
                    across Jaunpur and surrounding areas, ensuring accuracy, reliability, and excellent 
                    customer service at competitive prices.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                  <motion.div 
                    className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ rotate: 15 }}
                  >
                    <span className="text-white text-xl">👁️</span>
                  </motion.div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    To become the most trusted and preferred supplier of weighing solutions and home appliances 
                    in the region, known for our commitment to quality, innovation, and customer satisfaction.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;