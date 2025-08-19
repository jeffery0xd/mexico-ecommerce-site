import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { supabase } from '@/lib/supabase';
import { ChevronRight } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (data && !error) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3483FA] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando categorías...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Todas las Categorías</h1>
          <p className="text-gray-600">Explora nuestros productos por categoría</p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#3483FA] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Explora productos
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#3483FA] transition-colors" />
                </div>
                
                {/* Category Icon */}
                <div className="mt-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">
                      {category.name.includes('Celular') ? '📱' :
                       category.name.includes('Tecnología') ? '💻' :
                       category.name.includes('Hogar') ? '🏠' :
                       category.name.includes('Electrodomésticos') ? '🔌' :
                       category.name.includes('Deportes') ? '⚽' :
                       category.name.includes('Moda') ? '👕' :
                       category.name.includes('Herramientas') ? '🔨' :
                       category.name.includes('Construcción') ? '🏗️' :
                       category.name.includes('Vehículos') ? '🚗' :
                       category.name.includes('Inmuebles') ? '🏢' :
                       category.name.includes('Supermercado') ? '🛒' :
                       category.name.includes('Accesorios') ? '🔧' : '📱'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No hay categorías disponibles</p>
            <Link to="/" className="text-[#3483FA] hover:underline">
              Volver al inicio
            </Link>
          </div>
        )}

        {/* Back to All Products */}
        <div className="mt-12 text-center">
          <Link 
            to="/" 
            className="inline-block bg-white border border-[#3483FA] text-[#3483FA] px-6 py-3 rounded-md hover:bg-[#3483FA] hover:text-white transition-colors"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;