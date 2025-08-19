import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Product, Category } from '../types';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown, Grid, List } from 'lucide-react';

interface SeoSettings {
  category_title_template?: string;
  site_name?: string;
  default_title?: string;
}

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  // SEO设置
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    category_title_template: '',
    site_name: '',
    default_title: ''
  });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 48;

  useEffect(() => {
    if (slug) {
      fetchCategoryAndProducts();
    }
  }, [slug, currentPage, sortBy]);

  const fetchCategoryAndProducts = async () => {
    setLoading(true);
    try {
      // Fetch SEO settings first
      const { data: seoData } = await supabase
        .from('seo_settings')
        .select('*')
        .single();
      
      if (seoData) {
        setSeoSettings(seoData);
      }

      // Fetch category
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (categoryData && !categoryError) {
        setCategory(categoryData);
        
        // Set page title
        const title = seoData?.category_title_template
          ? seoData.category_title_template
              .replace('{categoryName}', categoryData.name)
              .replace('{siteName}', seoData.site_name || '')
          : `${categoryData.name} - MercadoLibre México`;
        document.title = title;

        // Build query for products
        let query = supabase
          .from('products')
          .select('*', { count: 'exact' })
          .eq('category_id', categoryData.id)
          .eq('is_active', true);

        // Apply price filter if set
        const minPrice = searchParams.get('min_price');
        const maxPrice = searchParams.get('max_price');
        if (minPrice) {
          query = query.gte('price', parseFloat(minPrice));
        }
        if (maxPrice) {
          query = query.lte('price', parseFloat(maxPrice));
        }

        // Apply sorting (prioritize pinned products)
        query = query.order('is_pinned', { ascending: false });
        
        switch (sortBy) {
          case 'price_asc':
            query = query.order('price', { ascending: true });
            break;
          case 'price_desc':
            query = query.order('price', { ascending: false });
            break;
          case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
          default:
            query = query.order('featured', { ascending: false })
                         .order('created_at', { ascending: false });
        }

        // Apply pagination
        const from = (currentPage - 1) * productsPerPage;
        const to = from + productsPerPage - 1;
        query = query.range(from, to);

        const { data: productsData, error: productsError, count } = await query;

        if (productsData && !productsError) {
          setProducts(productsData);
          setTotalProducts(count || 0);
        }
      }
    } catch (error) {
      console.error('Error fetching category and products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams);
    
    if (priceRange.min) {
      params.set('min_price', priceRange.min);
    } else {
      params.delete('min_price');
    }
    
    if (priceRange.max) {
      params.set('max_price', priceRange.max);
    } else {
      params.delete('max_price');
    }
    
    setSearchParams(params);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSearchParams({});
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3483FA] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
          <p className="text-gray-600 mb-6">La categoría que buscas no existe.</p>
          <Link to="/" className="bg-[#3483FA] text-white px-6 py-3 rounded-md hover:bg-[#2968C8]">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-[#3483FA]">Inicio</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600">{totalProducts.toLocaleString()} productos disponibles</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Sort Bar - Only sorting, no filters */}
          <div className="lg:hidden">
            <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Ordenar por:</span>
                <div className="relative flex-1">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-[#3483FA] w-full"
                  >
                    <option value="relevance">Más relevantes</option>
                    <option value="price_asc">Menor precio</option>
                    <option value="price_desc">Mayor precio</option>
                    <option value="newest">Más recientes</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
              <div className="mb-4">
                <h2 className="font-semibold text-gray-900">Filtros</h2>
              </div>

              <div className="space-y-6">
                {/* Price Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Precio</h3>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Mínimo"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Máximo"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={applyPriceFilter}
                        className="btn-primary flex-1 py-2 text-sm"
                      >
                        Aplicar
                      </button>
                      <button
                        onClick={clearFilters}
                        className="btn-secondary flex-1 py-2 text-sm"
                      >
                        Limpiar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Envío</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Envío gratis</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Envío FULL</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Condición</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                      <span className="text-sm text-gray-700">Nuevo</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Usado</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Area */}
          <div className="flex-1">
            {/* Desktop Sort Bar */}
            <div className="hidden lg:block bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Ordenar por:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA]"
                    >
                      <option value="relevance">Más relevantes</option>
                      <option value="price_asc">Menor precio</option>
                      <option value="price_desc">Mayor precio</option>
                      <option value="newest">Más recientes</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                    <Grid className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Anterior
                    </button>
                    
                    {[...Array(Math.min(10, totalPages))].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 border rounded ${
                            currentPage === page
                              ? 'bg-[#3483FA] text-white border-[#3483FA]'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No se encontraron productos en esta categoría</p>
                <Link to="/" className="text-[#3483FA] hover:underline">
                  Explorar otras categorías
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;