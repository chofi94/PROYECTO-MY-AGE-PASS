import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const publicLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/services' },
    { name: 'Sobre nosotros', path: '/aboutus' },
    { name: 'Contacto', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">My Age Pass</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {publicLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-slate-300 hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Solo se muestran si NO está cargando */}
          <div className="hidden md:flex items-center gap-4">
            {!loading && (
              isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-white"
                  >
                    <User className="w-5 h-5" />
                    <span>{user?.name || 'Usuario'}</span>
                  </button>

                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden"
                    >
                      <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 hover:bg-slate-700 transition-colors text-white" onClick={() => setIsProfileOpen(false)}>
                        <User className="w-4 h-4" /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 hover:bg-slate-700 transition-colors w-full text-left text-red-400">
                        <LogOut className="w-4 h-4" /> Cerrar sesión
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login"><Button variant="ghost" className="text-white">Iniciar sesión</Button></Link>
                  <Link to="/register"><Button className="bg-blue-600 hover:bg-blue-700 text-white">Registrarse</Button></Link>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;