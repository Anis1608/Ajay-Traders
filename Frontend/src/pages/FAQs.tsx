import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Scale, Wheat } from "lucide-react";

const FAQs = () => {
  const weighingScaleFAQs = [
    {
      question:
        "What is the accuracy of Gold Feild electronic weighing scales?",
      answer:
        "Our Gold Feild electronic weighing scales offer high precision with accuracy up to ±1g for smaller capacities and ±5g for larger industrial scales. All our scales are calibrated and tested before delivery.",
    },
    {
      question: "How long does the battery last on portable weighing scales?",
      answer:
        "The rechargeable battery typically lasts 8-12 hours of continuous use. Battery life depends on usage frequency and display brightness. We recommend charging overnight for best performance.",
    },
    {
      question: "Can I use the weighing scales outdoors?",
      answer:
        "Yes, many of our models are designed for outdoor use with IP65 waterproof rating. However, avoid direct exposure to heavy rain and extreme temperatures for longevity.",
    },
    {
      question: "What is the warranty period for weighing scales?",
      answer:
        "We provide 1-year comprehensive warranty on all electronic weighing scales, covering manufacturing defects and electronic components. Extended warranty options are available.",
    },
    {
      question: "How often should I calibrate my weighing scale?",
      answer:
        "For commercial use, we recommend calibration every 3-6 months. For home use, annual calibration is sufficient. We provide calibration services at your location.",
    },
    {
      question: "What maintenance is required for electronic scales?",
      answer:
        "Regular cleaning with a dry cloth, avoiding water contact with electronic parts, checking battery levels, and ensuring stable placement are key maintenance practices.",
    },
    {
      question: "Can I get different weighing units (kg, grams, pounds)?",
      answer:
        "Yes, most of our digital scales support multiple units including kg, grams, pounds, and ounces. Unit conversion can be done using the display panel.",
    },
    {
      question: "What should I do if my scale shows error codes?",
      answer:
        "Common error codes include 'Lo' (low battery), 'OL' (overload), and 'Er' (system error). Refer to the manual or contact us for troubleshooting assistance.",
    },
  ];

  const flourMillFAQs = [
    {
      question: "What types of grains can I grind in Jeevan Deep flour mills?",
      answer:
        "Our flour mills can grind wheat, rice, corn, barley, millet, and most dry grains. Avoid grinding oily seeds or wet grains to prevent damage to the motor.",
    },
    {
      question: "How much flour can the mill produce per hour?",
      answer:
        "Depending on the model, our domestic flour mills can produce 10-25 kg of flour per hour. The 1HP model typically produces around 15-20 kg/hour of fine wheat flour.",
    },
    {
      question: "Is the flour mill suitable for daily home use?",
      answer:
        "Absolutely! Our Jeevan Deep flour mills are specifically designed for daily domestic use with noise reduction technology and compact design suitable for home kitchens.",
    },
    {
      question: "How do I maintain my flour mill for longer life?",
      answer:
        "Regular cleaning after use, checking motor ventilation, lubricating bearings monthly, and ensuring dry storage are essential. Avoid overloading and continuous operation beyond recommended limits.",
    },
    {
      question: "What is the fineness level of flour produced?",
      answer:
        "Our mills can produce flour from coarse to very fine consistency. The fineness can be adjusted using the control mechanism provided with each unit.",
    },
    {
      question: "Can I grind spices and masalas in the flour mill?",
      answer:
        "While possible, we recommend using the mill primarily for grains. For spices, clean thoroughly between uses to avoid flavor mixing. Consider a separate smaller grinder for regular spice grinding.",
    },
    {
      question: "What safety features are included?",
      answer:
        "All our mills include overload protection, emergency stop switch, safety guards, and thermal protection to prevent motor damage from overheating.",
    },
    {
      question: "How much space does the flour mill require?",
      answer:
        "Our compact domestic models require approximately 2x2 feet of space with adequate ventilation. Wall mounting options are available for some models.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked{" "}
            <span className="gradient-primary bg-clip-text text-transparent bg-white rounded-xl inline-block shadow-md text-white px-2 py-1">
              Questions
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our weighing scales, flour
            mills, and water purifiers. Can't find what you're looking for?
            Contact us directly!
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {/* Weighing Scales FAQ */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Scale className="w-8 h-8 mr-3 text-primary" />
                Electronic Weighing Scales
                <Badge className="ml-3" variant="secondary">
                  GoldField
                </Badge>
              </CardTitle>
              <CardDescription className="text-base">
                Everything you need to know about our precision weighing scales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {weighingScaleFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`scale-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Flour Mills FAQ */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Wheat className="w-8 h-8 mr-3 text-primary" />
                Flour Mills (Atta Chakki)
                <Badge className="ml-3" variant="secondary">
                  Jeevan Deep
                </Badge>
              </CardTitle>
              <CardDescription className="text-base">
                Complete guide to our domestic flour grinding solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {flourMillFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`flour-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              Our team is here to help! Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:9889974041"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Call: 9889974041
              </a>
              <a
                href="mailto:ajaytred34@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Email Us
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQs;
