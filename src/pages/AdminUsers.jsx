
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, UserX, CheckCircle, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import * as adminService from '@/api/adminService';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      await adminService.deactivateUser(userId);
      toast({
        title: 'Success',
        description: 'User deactivated successfully',
      });
      loadUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to deactivate user',
        variant: 'destructive',
      });
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>User Management - Admin - SecureVerify</title>
        <meta name="description" content="Manage users and their accounts" />
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
                User Management
              </h1>
              <p className="text-slate-400">
                View and manage all registered users
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {loading ? (
                  <div className="py-12 flex justify-center">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Verified</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                            <td className="py-4 px-4 text-white">{user.name}</td>
                            <td className="py-4 px-4 text-slate-300">{user.email}</td>
                            <td className="py-4 px-4">
                              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm capitalize">
                                {user.role}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded text-sm ${
                                user.status === 'active' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              {user.verified ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <XCircle className="w-5 h-5 text-yellow-500" />
                              )}
                            </td>
                            <td className="py-4 px-4">
                              {user.status === 'active' && (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeactivate(user.id)}
                                >
                                  <UserX className="w-4 h-4 mr-1" />
                                  Deactivate
                                </Button>
                              )}
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

export default AdminUsers;
