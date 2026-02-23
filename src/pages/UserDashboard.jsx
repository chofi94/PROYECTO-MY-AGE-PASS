import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  FileCheck, 
  Settings, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Building2, 
  MapPin, 
  Fingerprint 
} from 'lucide-react';
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
        description: 'Error al cargar el historial de operaciones',
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
      title: 'Verificar ID',
      description: 'Iniciar nueva verificación',
      action: () => toast({ description: '🚧 Característica en desarrollo.' })
    },
    {
      icon: FileCheck,
      title: 'Documentos',
      description: 'Acceder a tus archivos',
      action: () => toast({ description: '🚧 Característica en desarrollo.' })
    },
    {
      icon: Settings,
      title: 'Configuración',
      description: 'Gestionar cuenta',
      action: () => toast({ description: '🚧 Característica en desarrollo.' })
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - My Age Pass</title>
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
                ¡Bienvenido, {user?.name.split(' ')[0]}!
              </h1>
              <p className="text-slate-400">
                Panel de control de <span className="text-blue-400 font-semibold">{user?.company?.name || 'la empresa'}</span>
              </p>
            </motion.div>

            {/* Profile & Company Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card>
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  {/* User Basic Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <User className="w-10 h-10 text-blue-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                      <p className="text-slate-400">{user?.email}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                          {user?.role || 'Cliente'}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20 uppercase flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Activo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Company Info (Nuevos campos del Registro) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 max-w-2xl bg-slate-800/30 p-5 rounded-2xl border border-slate-700/50">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-blue-400 mt-1" />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Razón Social</p>
                        <p className="text-sm text-slate-200 font-medium">{user?.company?.name || 'Cargando...'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Fingerprint className="w-5 h-5 text-blue-400 mt-1" />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">CIF / NIF</p>
                        <p className="text-sm text-slate-200 font-medium">{user?.company?.cif || 'No disponible'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 md:col-span-2 border-t border-slate-700/50 pt-3">
                      <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Dirección Fiscal</p>
                        <p className="text-sm text-slate-200 font-medium">{user?.company?.address || 'Sin dirección registrada'}</p>
                      </div>
                    </div>
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
              <h2 className="text-2xl font-bold text-white mb-4">Acciones rápidas</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <Card key={index} className="cursor-pointer hover:border-blue-500/50 transition-all group" onClick={action.action}>
                    <action.icon className="w-10 h-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
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
              <h2 className="text-2xl font-bold text-white mb-4">Historial de operaciones</h2>
              <Card>
                {loading ? (
                  <div className="py-12 flex justify-center">
                    <LoadingSpinner />
                  </div>
                ) : verificationHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Tipo</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Documento</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Estado</th>
                          <th className="text-left py-3 px-4 text-slate-400 font-medium">Fecha</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {verificationHistory.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                            <td className="py-4 px-4 text-white font-medium">{item.type}</td>
                            <td className="py-4 px-4 text-slate-300">{item.document || 'N/A'}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(item.status)}
                                <span className="text-white capitalize text-sm">{item.status}</span>
                              </div>
                            </td>
                            {/* Formateamos la fecha para que sea legible */}
                            <td className="py-4 px-4 text-slate-400 text-sm">
                              {item.date ? new Date(item.date).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) : '---'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-slate-400 text-lg">No hay operaciones registradas todavía.</p>
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