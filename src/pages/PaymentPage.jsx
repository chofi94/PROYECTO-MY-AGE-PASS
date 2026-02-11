
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const selectedPlan = {
    name: 'Professional',
    price: '$149',
    period: '/month'
  };

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Format card number
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5);
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!formData.expiry) newErrors.expiry = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (formData.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: 'Payment Successful!',
        description: 'Your subscription has been activated.',
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>My Age Pass</title>
        <meta name="description" content="Complete your payment to activate your SecureVerify subscription" />
      </Helmet>

      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                Completa tu pago
              </h1>
              <p className="text-slate-400">
                Pago seguro con encriptación líder en el sector              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <Card>
                  <div className="flex items-center gap-2 mb-6">
                    <Lock className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-slate-400">Pago seguro con cifrado SSL</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                      label="Cardholder Name"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      error={errors.cardName}
                      disabled={loading}
                    />

                    <FormInput
                      label="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      error={errors.cardNumber}
                      disabled={loading}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        label="Expiry Date"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        error={errors.expiry}
                        disabled={loading}
                      />

                      <FormInput
                        label="CVV"
                        name="cvv"
                        type="password"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={3}
                        error={errors.cvv}
                        disabled={loading}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 py-6"
                      disabled={loading}
                    >
                      {loading ? (
                        <LoadingSpinner size="small" />
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Pagar {selectedPlan.price}{selectedPlan.period}
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-slate-400 text-center">
                      Al confirmar tu suscripción, aceptas nuestros términos de servicio.
                    </p>
                  </form>
                </Card>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <Card>
                  <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Plan</span>
                      <span className="text-white font-semibold">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Billing Cycle</span>
                      <span className="text-white">Monthly</span>
                    </div>
                    <div className="border-t border-slate-700 pt-4 flex justify-between">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-2xl font-bold text-white">
                        {selectedPlan.price}
                        <span className="text-sm text-slate-400">{selectedPlan.period}</span>
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <h4 className="text-white font-semibold mb-2">Included Features:</h4>
                    <ul className="space-y-2">
                      {[
                        '1,000 verifications/month',
                        'Advanced NFC scanning',
                        'Priority support',
                        'Full API access',
                        'Advanced analytics'
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PaymentPage;
