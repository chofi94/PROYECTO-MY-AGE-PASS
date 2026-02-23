import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Building2, Fingerprint } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    cif: '', // Añadido para solucionar el error SQL 1364
    email: '',
    password: '',
    password_confirmation: '',
    address: ''
  });
  
  const [errors, setErrors] = useState({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.company_name) newErrors.company_name = 'El nombre de la empresa es obligatorio';
    if (!formData.cif) newErrors.cif = 'El CIF es obligatorio para el registro';
    
    if (!formData.email) newErrors.email = 'El email es obligatorio';
    if (!formData.email.includes('@')) newErrors.email = 'Formato de email inválido';
    
    if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
    if (formData.password.length < 8) newErrors.password = 'Debe tener al menos 8 caracteres';
    
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Las contraseñas no coinciden';
    }
    
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
    try {
      await register(formData);
      
      toast({
        title: '¡Cuenta creada!',
        description: 'Registro completado con éxito.',
      });
      
      navigate('/dashboard');
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Error en el registro';
      toast({
        title: 'Error de Servidor',
        description: serverMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Registro - My Age Pass</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700 p-8">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-blue-500" />
            </div>

            <h1 className="text-3xl font-bold text-center text-white mb-2">Crear Cuenta</h1>
            <p className="text-slate-400 text-center mb-8">Introduce los datos de tu empresa</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Nombre Completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Juan Pérez"
                error={errors.name}
                disabled={loading}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Empresa"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Nombre Empresa"
                  error={errors.company_name}
                  disabled={loading}
                />
                <FormInput
                  label="CIF"
                  name="cif"
                  value={formData.cif}
                  onChange={handleChange}
                  placeholder="B12345678"
                  error={errors.cif}
                  disabled={loading}
                />
              </div>

              <FormInput
                label="Correo Electrónico"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                error={errors.email}
                disabled={loading}
              />

              <FormInput
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.password}
                disabled={loading}
              />

              <FormInput
                label="Confirmar Contraseña"
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.password_confirmation}
                disabled={loading}
              />

              <FormInput
                label="Dirección de la Empresa"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Calle Falsa 123, Madrid"
                error={errors.address}
                disabled={loading}
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 mt-4"
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="small" /> : 'Registrarse ahora'}
              </Button>
            </form>

            <p className="text-center text-slate-400 text-sm mt-6">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-blue-400 hover:underline">Inicia sesión</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;