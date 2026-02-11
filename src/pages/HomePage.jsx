
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Smartphone, Lock, CheckCircle, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'NFC Verification',
      description: 'Advanced NFC chip reading technology for instant document authentication'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Military-grade encryption protecting your sensitive information'
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Instant verification results with 99.9% uptime guarantee'
    },
    {
      icon: Globe,
      title: 'Global Compliance',
      description: 'GDPR, KYC, and AML compliant verification solutions'
    }
  ];

  return (
    <>
      <Helmet>
        <title>My Age Pass</title>
        <meta name="description" content="Secure identity verification platform with NFC technology, document validation, and global compliance. Trusted by businesses worldwide." />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 opacity-50"></div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Verificación rapida. Compra inteligente.
                </h1>
                <p className="text-xl text-slate-300 mb-8">
                  Verifica la edad con confianza y facilidad utilizando MyAgePass
                </p>
                

                
              
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1574311382329-80bcc540bd52"
                  alt="Secure identity verification"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-blue-600 rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-white" />
                    <div>
                      <p className="text-white font-bold text-lg">99.9% de precisión</p>
                      <p className="text-blue-100 text-sm">Resultados verificados</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-slate-800/50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                ¿Porqué elegir My Age Pass?
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Tecnología de verificación líder en el sector en la que confían miles de empresas de todo el mundo.              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
                    <feature.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { value: '2M', label: 'Verifications Processed' },
                { value: '10K+', label: 'Active Businesses' },
                { value: '99.9%', label: 'Uptime Guarantee' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Card>
                    <h3 className="text-5xl font-bold text-blue-500 mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-slate-400 text-lg">{stat.label}</p>
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
                ¿Preparado para proteger tu negocio?
              </h2>
              <p className="text-xl text-slate-200 mb-8">
                Únte a miles de empresas que utilizan My Age Pass para cualquiera de tus necesidades de verificación de identidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-slate-100 text-lg px-8">
                    Regístrate aquí
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                    Contacta con nosotros
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

export default HomePage;
