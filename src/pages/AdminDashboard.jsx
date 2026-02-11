
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, FileCheck, Shield, TrendingUp, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const stats = [
    { icon: Users, label: 'Total Users', value: '2,543', change: '+12%', color: 'blue' },
    { icon: FileCheck, label: 'Verifications', value: '8,392', change: '+23%', color: 'green' },
    { icon: Shield, label: 'Pending Requests', value: '47', change: '-8%', color: 'yellow' },
    { icon: Activity, label: 'Success Rate', value: '98.4%', change: '+2%', color: 'purple' }
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Verification approved', time: '5 minutes ago' },
    { user: 'Jane Smith', action: 'New registration', time: '12 minutes ago' },
    { user: 'Bob Johnson', action: 'Document uploaded', time: '1 hour ago' },
    { user: 'Alice Williams', action: 'Verification pending', time: '2 hours ago' }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - SecureVerify</title>
        <meta name="description" content="SecureVerify admin panel for managing users and verifications" />
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
                Admin Dashboard
              </h1>
              <p className="text-slate-400">
                Monitor and manage your verification platform
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                      </div>
                      <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-1"
              >
                <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
                <Card className="space-y-3">
                  <Link to="/admin/users">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                      <Users className="w-5 h-5 mr-2" />
                      Manage Users
                    </Button>
                  </Link>
                  <Link to="/admin/verifications">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                      <FileCheck className="w-5 h-5 mr-2" />
                      View Verifications
                    </Button>
                  </Link>
                  <Button className="w-full bg-slate-700 hover:bg-slate-600 justify-start">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Analytics
                  </Button>
                  <Button className="w-full bg-slate-700 hover:bg-slate-600 justify-start">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Settings
                  </Button>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:col-span-2"
              >
                <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
                <Card>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                      >
                        <div>
                          <p className="text-white font-semibold">{activity.user}</p>
                          <p className="text-slate-400 text-sm">{activity.action}</p>
                        </div>
                        <span className="text-slate-500 text-sm">{activity.time}</span>
                      </div>
                    ))}
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

export default AdminDashboard;
