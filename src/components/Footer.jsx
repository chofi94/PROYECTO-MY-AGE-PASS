
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
              <span className="text-lg font-bold text-white">SecureVerify</span>
            </div>
            <p className="text-slate-400 text-sm">
              Leading provider of NFC verification and secure identity solutions for businesses worldwide.
            </p>
          </div>

          <div>
            <span className="text-white font-semibold block mb-4">Quick Links</span>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link to="/services" className="text-slate-400 hover:text-white transition-colors text-sm">
                Services
              </Link>
              <Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <span className="text-white font-semibold block mb-4">Legal</span>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/compliance" className="text-slate-400 hover:text-white transition-colors text-sm">
                Compliance
              </Link>
            </div>
          </div>

          <div>
            <span className="text-white font-semibold block mb-4">Contact Us</span>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@secureverify.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>123 Security Blvd, Tech City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {currentYear} SecureVerify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
