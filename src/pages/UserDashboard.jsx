
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Shield, FileCheck, Settings, CheckCircle, Clock, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import * as userService from '@/api/userService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadVerificationHistory();
  }, []);

  const loadVerificationHistory = async () => {
    try {
      const history = await userService.getVerificationHistory();
      setVerificationHistory(history);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load verification history',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const quickActions = [
    {
      icon: Shield,
      title: 'Verify ID',
      description: 'Start new verification',
      action: () => toast({ description: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀' })
    },
    {
      icon: FileCheck,
      title: 'View Documents',
      description: 'Access your documents',
      action: () => toast({ description: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀' })
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Manage your account',
      action: () => toast({ description: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀' })
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - SecureVerify</title>
        <meta name="description" content="Manage your identity verifications and account settings" />
      </Helmet>

      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-slate-400">
                Manage your verifications and account settings
              </p>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                    <p className="text-slate-400">{user?.email}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      {user?.verified ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-white font-semibold">Verified</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-5 h-5 text-yellow-500" />
                          <span className="text-white font-semibold">Pending</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Account Type</p>
                    <span className="text-white font-semibold capitalize">{user?.role}</span>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Member Since</p>
                    <span className="text-white font-semibold">Jan 2024</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <Card key={index} className="cursor-pointer" onClick={action.action}>
                    <action.icon className="w-10 h-10 text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{action.description}</p>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Verification History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Verification History</h2>
              <Card>
                {loading ? (
                  <div className="py-12 flex justify-center">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Document</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {verificationHistory.map((item) => (
                          <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                            <td className="py-4 px-4 text-white">{item.type}</td>
                            <td className="py-4 px-4 text-slate-300">{item.document}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(item.status)}
                                <span className="text-white capitalize">{item.status}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-slate-400">{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
