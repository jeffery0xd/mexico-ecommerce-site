import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F7F7F7] border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Customer Service */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Atención al cliente</h3>
            <ul className="space-y-2">
              <li><Link to="/ayuda" className="text-gray-600 hover:text-[#3483FA] text-sm">Centro de ayuda</Link></li>
              <li><Link to="/contacto" className="text-gray-600 hover:text-[#3483FA] text-sm">Contáctanos</Link></li>
              <li><Link to="/terminos" className="text-gray-600 hover:text-[#3483FA] text-sm">Términos y condiciones</Link></li>
              <li><Link to="/privacidad" className="text-gray-600 hover:text-[#3483FA] text-sm">Política de privacidad</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Acerca de</h3>
            <ul className="space-y-2">
              <li><Link to="/nosotros" className="text-gray-600 hover:text-[#3483FA] text-sm">Quienes somos</Link></li>
              <li><Link to="/carreras" className="text-gray-600 hover:text-[#3483FA] text-sm">Trabaja con nosotros</Link></li>
              <li><Link to="/prensa" className="text-gray-600 hover:text-[#3483FA] text-sm">Prensa</Link></li>
              <li><Link to="/inversores" className="text-gray-600 hover:text-[#3483FA] text-sm">Inversores</Link></li>
            </ul>
          </div>

          {/* My Account */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Mi cuenta</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-600 hover:text-[#3483FA] text-sm">Ingresar</Link></li>
              <li><Link to="/register" className="text-gray-600 hover:text-[#3483FA] text-sm">Crear cuenta</Link></li>
              <li><Link to="/mis-compras" className="text-gray-600 hover:text-[#3483FA] text-sm">Mis compras</Link></li>
              <li><Link to="/favoritos" className="text-gray-600 hover:text-[#3483FA] text-sm">Favoritos</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Síguenos</h3>
            <ul className="space-y-2">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#3483FA] text-sm">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#3483FA] text-sm">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#3483FA] text-sm">Instagram</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#3483FA] text-sm">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              <p>© 2024 MercadoLibre México. Todos los derechos reservados.</p>
            </div>
            <div className="flex items-center space-x-4">
              <img src="/payment-visa.png" alt="Visa" className="h-6" />
              <img src="/payment-mastercard.png" alt="Mastercard" className="h-6" />
              <img src="/payment-amex.png" alt="American Express" className="h-6" />
              <img src="/payment-paypal.png" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;