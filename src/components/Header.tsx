import React, { useState, useEffect } from 'react';
import { Search, Menu, ShoppingCart, Heart, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Category } from '../types';
import { supabase } from '../lib/supabase';

const Header: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (data && !error) {
      setCategories(data);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50" style={{ fontFamily: '"Proxima Nova", -apple-system, Helvetica, Arial, sans-serif' }}>
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 sm:hidden shadow-md">
          <div className="space-y-3">
            <div className="border-t border-gray-200 pt-2">
              <span className="block text-sm text-gray-500 mb-2 font-medium">Categorías</span>
              {categories.slice(0, 6).map((category) => (
                <Link 
                  key={category.id}
                  to={`/categoria/${category.slug}`}
                  className="block text-[#333333] hover:text-[#3483FA] py-2 font-medium flex items-center"
                >
                  <span className="mr-2">
                    {category.name.includes('Celular') ? '📱' :
                     category.name.includes('Tecnología') || category.name.includes('Tecnologia') ? '💻' :
                     category.name.includes('Hogar') ? '🏠' :
                     category.name.includes('Electrodomésticos') || category.name.includes('Electrodomesticos') ? '🔌' :
                     category.name.includes('Deportes') ? '⚽' :
                     category.name.includes('Moda') ? '👕' : '📱'}
                  </span>
                  {category.name}
                </Link>
              ))}
              <Link to="/categoria/tecnologia" className="block text-[#3483FA] font-medium py-2 flex items-center">
                Ver todas
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="bg-[#FFE600] border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/logo.svg" 
                alt="MercadoLibre" 
                className="h-8 w-auto"
              />
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar productos, marcas y más..."
                  className="w-full px-4 py-2 border border-[#E6E6E6] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-[#3483FA] text-sm shadow-sm"
                  style={{ height: '40px' }}
                />
                <button
                  type="submit"
                  className="bg-[#3483FA] text-white px-4 py-2 rounded-r-md hover:bg-[#2968C8] focus:outline-none focus:ring-2 focus:ring-[#3483FA] transition-colors flex items-center justify-center"
                  style={{ height: '40px', width: '40px' }}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-bold">Disney+</span>
              </div>
              
              <Link to="/ofertas" className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-[#3483FA] text-sm">
                <span>Ofertas</span>
              </Link>
              
              <Link to="/carrito" className="flex items-center space-x-1 text-gray-700 hover:text-[#3483FA]">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden md:inline text-sm">Carrito</span>
              </Link>
              
              <Link to="/favoritos" className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-[#3483FA]">
                <Heart className="w-5 h-5" />
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-700 hover:text-[#3483FA] sm:hidden"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-6 text-sm whitespace-nowrap pb-1">
              <div className="relative">
                <button 
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-[#3483FA] py-1 px-2 rounded-md transition-colors"
                >
                  <Menu className="w-4 h-4" />
                  <span>Categorías</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
                </button>
                
                {showCategories && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-80">
                    <div className="grid grid-cols-2 p-4 gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/categoria/${category.slug}`}
                          className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 rounded text-gray-700 hover:text-[#3483FA] text-sm"
                          onClick={() => setShowCategories(false)}
                        >
                          <span className="text-lg">
                            {category.name.includes('Celular') ? '📱' :
                             category.name.includes('Ofertas relámpago') || category.name.includes('Tecnologia') ? '💻' :
                             category.name.includes('Hogar') ? '🏠' :
                             category.name.includes('Electrodomésticos') || category.name.includes('Electrodomesticos') ? '🔌' :
                             category.name.includes('Deportes') ? '⚽' :
                             category.name.includes('Moda') ? '👕' :
                             category.name.includes('Herramientas') ? '🔨' :
                             category.name.includes('Construcción') || category.name.includes('Construccion') ? '🏗️' :
                             category.name.includes('Vehículos') || category.name.includes('Vehiculos') ? '🚗' :
                             category.name.includes('Inmuebles') ? '🏢' :
                             category.name.includes('Supermercado') ? '🛒' :
                             category.name.includes('Accesorios') ? '🔧' : '📱'}
                          </span>
                          <span className="text-xs font-medium">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 p-3">
                      <Link
                        to="/categoria/tecnologia"
                        className="flex items-center justify-center space-x-1 text-[#3483FA] hover:underline font-medium text-sm"
                        onClick={() => setShowCategories(false)}
                      >
                        <span>Ver todas las categorías</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="/categoria/tecnologia" className="text-gray-700 hover:text-[#3483FA] py-1 px-2 rounded-md transition-colors font-medium">Ofertas</Link>
              <Link to="/categoria/tecnologia" className="text-gray-700 hover:text-[#3483FA] py-1 px-2 rounded-md transition-colors font-medium">Historial</Link>
              <Link to="/categoria/tecnologia" className="text-gray-700 hover:text-[#3483FA] py-1 px-2 rounded-md transition-colors font-medium">Supermercado</Link>
              <Link to="/categoria/tecnologia" className="text-gray-700 hover:text-[#3483FA] py-1 px-2 rounded-md transition-colors font-medium">Moda</Link>
              <Link to="/categoria/tecnologia" className="text-gray-700 hover:text-[#3483FA] py-1 px-2 rounded-md transition-colors font-medium">Vender</Link>
              <Link to="/categoria/tecnologia" className="text-gray-700 hover:text-[#3483FA] py-1 px-2 rounded-md transition-colors font-medium">Ayuda</Link>
              
              {/* Additional Links for Larger Screens */}
              <Link to="/categoria/tecnologia" className="hidden md:block text-gray-700 hover:text-[#3483FA]">Electrónica</Link>
              <Link to="/categoria/tecnologia" className="hidden md:block text-gray-700 hover:text-[#3483FA]">Mejoras para el hogar</Link>
              <Link to="/categoria/tecnologia" className="hidden md:block text-gray-700 hover:text-[#3483FA]">Juguetes</Link>
              <Link to="/categoria/tecnologia" className="hidden lg:block text-gray-700 hover:text-[#3483FA]">Salud</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;