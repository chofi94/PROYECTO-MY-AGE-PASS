
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Smartphone, CheckCircle, Lock, FileCheck, Globe, Zap, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      icon: Smartphone,
      title: 'NFC Verification',
      description: 'Advanced NFC chip reading for secure document authentication with real-time validation',
      features: ['Instant verification', 'Anti-counterfeit detection', 'Cross-platform support']
    },
    {
      icon: Shield,
      title: 'Identity Protection',
      description: 'Multi-layer security protocols to protect user identity and sensitive information',
      features: ['Encryption standards', 'Biometric integration', 'Fraud prevention']
    },
    {
      icon: FileCheck,
      title: 'Document Verification',
      description: 'AI-powered document analysis and validation for passports, IDs, and licenses',
      features: ['OCR technology', 'Hologram detection', 'Database cross-check']
    },
    {
      icon: Globe,
      title: 'Global Compliance',
      description: 'Meet international regulatory standards including GDPR, KYC, and AML requirements',
      features: ['GDPR compliant', 'KYC/AML ready', 'Audit trails']
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for small businesses',
      features: [
        '100 verifications/month',
        'Basic NFC scanning',
        'Email support',
        'API access',
        'Basic analytics'
      ],
      recommended: false
    },
    {
      name: 'Professional',
      price: '$149',
      period: '/month',
      description: 'For growing companies',
      features: [
        '1,000 verifications/month',
        'Advanced NFC scanning',
        'Priority support',
        'Full API access',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated account manager'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Unlimited verifications',
        'White-label solution',
        '24/7 premium support',
        'Custom API endpoints',
        'Advanced security features',
        'On-premise deployment',
        'SLA guarantees'
      ],
      recommended: false
    }
  ];

  const features = [
    { icon: Zap, text: '99.9% Uptime Guarantee' },
    { icon: Lock, text: 'Bank-Level Security' },
    { icon: Award, text: 'ISO 27001 Certified' },
    { icon: CheckCircle, text: 'GDPR Compliant' }
  ];

  return (
    <>
      <Helmet>
        <title>Services - SecureVerify | NFC Verification & Identity Solutions</title>
        <meta name="description" content="Explore SecureVerify's comprehensive identity verification services including NFC verification, document validation, and global compliance solutions" />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Services
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Comprehensive identity verification solutions designed to protect your business and build trust with your customers
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <service.icon className="w-12 h-12 text-blue-500 mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-3">
                      {service.title}
                    </h2>
                    <p className="text-slate-400 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-300">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="py-12 px-4 bg-slate-800/50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center gap-3"
                >
                  <feature.icon className="w-8 h-8 text-blue-500" />
                  <span className="text-sm text-slate-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Pricing Plans
              </h2>
              <p className="text-slate-400 text-lg">
                Choose the perfect plan for your business needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`h-full relative ${plan.recommended ? 'border-blue-500 border-2' : ''}`}>
                    {plan.recommended && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Recommended
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-400 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-slate-400">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-300">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/register">
                      <Button
                        className={`w-full ${plan.recommended ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-600'}`}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-200 mb-8">
                Join thousands of businesses using SecureVerify for their identity verification needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-slate-100">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
