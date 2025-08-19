import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface SeoSettings {
  home_title?: string;
  site_name?: string;
  product_title_template?: string;
  category_title_template?: string;
}

interface BannerSettings {
  id: number;
  title: string;
  subtitle: string;
  background_image?: string;
  background_color: string;
  text_color: string;
  is_active: boolean;
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [bannerSettings, setBannerSettings] = useState<BannerSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchSeoSettings();
    fetchBannerSettings();
  }, []);

  const fetchSeoSettings = async () => {
    try {
      const { data: seoSettings } = await supabase
        .from('seo_settings')
        .select('*')
        .single();
      
      if (seoSettings?.home_title) {
        document.title = seoSettings.home_title;
      } else if (seoSettings?.site_name) {
        document.title = seoSettings.site_name;
      }
    } catch (error) {
      console.log('No SEO settings found, using default title');
    }
  };

  const fetchBannerSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('banner_settings')
        .select('*')
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      setBannerSettings(data);
    } catch (error) {
      console.log('No banner settings found, using default');
      // 使用默认banner设置
      setBannerSettings({
        id: 0,
        title: 'Descubre los Mejores Productos',
        subtitle: 'Calidad premium para el mercado mexicano',
        background_color: '#3B82F6',
        text_color: '#FFFFFF',
        is_active: true
      });
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(12);
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando productos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="text-white py-20 relative overflow-hidden"
        style={{
          backgroundColor: bannerSettings?.background_color || '#3B82F6',
          color: bannerSettings?.text_color || '#FFFFFF',
          backgroundImage: bannerSettings?.background_image 
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bannerSettings.background_image})`
            : bannerSettings?.background_color 
              ? undefined
              : 'linear-gradient(to right, #3B82F6, #9333EA)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {bannerSettings?.title || 'Descubre los Mejores Productos'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {bannerSettings?.subtitle || 'Calidad premium para el mercado mexicano'}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestra selección curada de productos de alta calidad
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No hay productos disponibles.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para descubrir más?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Explora todas nuestras categorías y encuentra exactamente lo que necesitas
          </p>
          <a 
            href="/categoria/todos" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Ver Todos los Productos
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;