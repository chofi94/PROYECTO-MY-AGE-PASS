
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import * as adminService from '@/api/adminService';

const AdminVerifications = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadVerifications();
  }, []);

  const loadVerifications = async () => {
    try {
      const data = await adminService.getVerifications();
      setVerifications(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load verifications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await adminService.approveVerification(id);
      toast({
        title: 'Success',
        description: 'Verification approved',
      });
      loadVerifications();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve verification',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (id) => {
    try {
      await adminService.rejectVerification(id, 'Document quality insufficient');
      toast({
        title: 'Success',
        description: 'Verification rejected',
      });
      loadVerifications();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject verification',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      approved: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400'
    };
    return styles[status] || styles.pending;
  };

  return (
    <>
      <Helmet>
        <title>Verification Management - Admin - SecureVerify</title>
        <meta name="description" content="Manage verification requests" />
      </Helmet>

      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Header />

        <main className="flex-1 pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                Verification Management
              </h1>
              <p className="text-slate-400">
                Review and manage verification requests
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
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
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">User</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Document</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Submitted</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {verifications.map((verification) => (
                          <tr key={verification.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                            <td className="py-4 px-4 text-white">{verification.userName}</td>
                            <td className="py-4 px-4 text-slate-300">{verification.type}</td>
                            <td className="py-4 px-4 text-slate-300">{verification.document}</td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded text-sm capitalize ${getStatusBadge(verification.status)}`}>
                                {verification.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-slate-400">{verification.submittedAt}</td>
                            <td className="py-4 px-4">
                              <div className="flex gap-2">
                                {verification.status === 'pending' ? (
                                  <>
                                    <Button
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() => handleApprove(verification.id)}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleReject(verification.id)}
                                    >
                                      <XCircle className="w-4 h-4 mr-1" />
                                      Reject
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-600"
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                )}
                              </div>
                            </td>
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

export default AdminVerifications;
