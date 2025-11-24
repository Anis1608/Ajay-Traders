import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      // Success - show confirmation in the form area
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-black">Us</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for all your weighing scale and flour mill needs. 
            We're here to help you find the perfect solution.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Phone className="w-6 h-6 mr-2 text-primary" />
                  Phone Numbers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">Primary:</span>
                    <a href="tel:9889974041" className="ml-2 text-primary hover:underline">
                      9889974041
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">Secondary:</span>
                    <a href="tel:9118826715" className="ml-2 text-primary hover:underline">
                      9118826715
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Mail className="w-6 h-6 mr-2 text-primary" />
                  Email Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:ajaytred34@gmail.com" className="text-primary hover:underline">
                  ajaytred34@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <MapPin className="w-6 h-6 mr-2 text-primary" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Village Ramgarh Machhali Shahar<br />
                  Barshathi Road, Bandhawa Market<br />
                  Jaunpur, Uttar Pradesh - 222143
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Clock className="w-6 h-6 mr-2 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Saturday:</span>
                    <span className="font-semibold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
              <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <MessageSquare className="w-6 h-6 mr-2 text-primary" />
                For Enquiries, Orders, or Support Reach Out
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Thank you for your message!
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    We've received your inquiry and will get back to you soon.
                  </p>
                  <Button
                    onClick={resetForm}
                    className="gradient-primary text-white"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="rounded-md bg-red-50 p-4 mb-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Error submitting form
                          </h3>
                          <p className="text-sm text-red-700 mt-1">
                            {error}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What can we help you with?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us more about your requirements..."
                      rows={5}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-white hover:scale-105 transition-transform"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Find Us on Map</CardTitle>
              <CardDescription>
                Visit our store in Jaunpur, Uttar Pradesh
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 relative">
              {/* Google Map Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.344542427664!2d82.65253667562425!3d26.79201977673559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3990383f292b6b85%3A0x9c9e46cbf12c2eeb!2sBandhawa%20Market%2C%20Jaunpur%2C%20Uttar%20Pradesh%20222143!5e0!3m2!1sen!2sin!4v1718602194030!5m2!1sen!2sin"
                width="100%"
                height="384"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96"
              ></iframe>

              {/* Transparent Overlay Link */}
              <a
                href="https://maps.app.goo.gl/N9n46yPtYWFDjUW69"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-0 left-0 w-full h-full z-10"
                title="Open in Google Maps"
              >
                {/* Optional Overlay Text or Icon */}
                <div className="flex items-end justify-end h-full w-full p-4 pointer-events-none">
                  <div className="bg-white/80 backdrop-blur-md rounded-lg p-2 shadow">
                    <MapPin className="w-5 h-5 text-primary inline-block mr-1" />
                    <span className="text-sm font-medium text-gray-700">Open in Google Maps</span>
                  </div>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;