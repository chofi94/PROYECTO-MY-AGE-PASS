
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold text-white">My Age Pass</span>
            </div>
            <p className="text-slate-400 text-sm">
              Proveedor líder de soluciones de verificación NFC e identidad segura para empresas de todo el mundo.
            </p>
          </div>

          <div>
            <span className="text-white font-semibold block mb-4">Enlaces rápidos</span>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                Inicio
              </Link>
              <Link to="/services" className="text-slate-400 hover:text-white transition-colors text-sm">
                Servicios
              </Link>
              <Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">
                Contacto
              </Link>
            </div>
          </div>

          <div>
            <span className="text-white font-semibold block mb-4">Términos legales</span>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
                Política de privacidad
              </Link>
              <Link to="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">
                Términos de servicio
              </Link>
              <Link to="/compliance" className="text-slate-400 hover:text-white transition-colors text-sm">
                Cumplimiento normativo
              </Link>
            </div>
          </div>

          <div>
            <span className="text-white font-semibold block mb-4">Contacta con nosotros</span>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@myagepass.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>967 30 34 35</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Madrid, ESPAÑA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {currentYear} My Age Pass. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
