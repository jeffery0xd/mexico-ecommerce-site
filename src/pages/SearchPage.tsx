import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (query) {
      searchProducts();
    }
  }, [query]);

  const searchProducts = async () => {
    setLoading(true);
    try {
      // Search in product names and descriptions
      const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,variant.ilike.%${query}%,description.ilike.%${query}%`)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (data && !error) {
        setProducts(data);
        setTotalResults(count || 0);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="w-6 h-6 text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-900">
              Resultados para: <span className="text-[#3483FA]">"{query}"</span>
            </h1>
          </div>
          <p className="text-gray-600">
            {loading ? 'Buscando...' : `${totalResults.toLocaleString()} productos encontrados`}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3483FA] mx-auto mb-4"></div>
              <p className="text-gray-600">Buscando productos...</p>
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No encontramos productos para "{query}"
              </h2>
              <p className="text-gray-600 mb-6">
                Intenta con palabras clave diferentes o explora nuestras categorías
              </p>
            </div>
            
            {/* Suggestions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-4">Sugerencias:</h3>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li>• Verifica la ortografía de tu búsqueda</li>
                <li>• Utiliza palabras más generales</li>
                <li>• Prueba con sinónimos o términos relacionados</li>
                <li>• Explora nuestras categorías populares</li>
              </ul>
              
              <div className="mt-6 space-y-3">
                <Link
                  to="/category/tecnologia"
                  className="block bg-[#3483FA] text-white text-center py-2 rounded-md hover:bg-[#2968C8]"
                >
                  Ver Celulares y Telefonía
                </Link>
                <Link
                  to="/category/tecnologia"
                  className="block border border-[#3483FA] text-[#3483FA] text-center py-2 rounded-md hover:bg-[#3483FA] hover:text-white"
                >
                  Ver Ofertas relámpago
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;