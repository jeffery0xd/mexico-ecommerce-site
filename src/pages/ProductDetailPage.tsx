import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, Category } from '../types';
import { supabase } from '../lib/supabase';
import { Heart, Share2, Truck, Shield, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface SeoSettings {
  product_title_template?: string;
  site_name?: string;
  default_title?: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // SEO设置
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    product_title_template: '',
    site_name: '',
    default_title: ''
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      // Fetch SEO settings first
      const { data: seoData } = await supabase
        .from('seo_settings')
        .select('*')
        .single();
      
      if (seoData) {
        setSeoSettings(seoData);
      }

      // Fetch product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

      if (productData && !productError) {
        setProduct(productData);
        
        // Set page title
        const productName = `${productData.name}${productData.variant ? ` - ${productData.variant}` : ''}`;
        const title = seoData?.product_title_template
          ? seoData.product_title_template
              .replace('{productName}', productName)
              .replace('{siteName}', seoData.site_name || '')
          : `${productName} - MercadoLibre México`;
        document.title = title;

        // Fetch category if product has one
        if (productData.category_id) {
          const { data: categoryData } = await supabase
            .from('categories')
            .select('*')
            .eq('id', productData.category_id)
            .maybeSingle();
          
          if (categoryData) {
            setCategory(categoryData);
          }

          // Fetch related products
          const { data: relatedData } = await supabase
            .from('products')
            .select('*')
            .eq('category_id', productData.category_id)
            .eq('is_active', true)
            .neq('id', id)
            .limit(4);
          
          if (relatedData) {
            setRelatedProducts(relatedData);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getImages = () => {
    if (product?.images && product.images.length > 0) {
      return product.images;
    }
    return ['/placeholder/600x600.png'];
  };

  const nextImage = () => {
    const images = getImages();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getImages();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBuyClick = () => {
    if (product?.buy_link) {
      window.location.href = product.buy_link;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3483FA] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <p className="text-gray-600 mb-6">El producto que buscas no existe o no está disponible.</p>
          <Link to="/" className="bg-[#3483FA] text-white px-6 py-3 rounded-md hover:bg-[#2968C8]">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const images = getImages();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-[#3483FA]">Inicio</Link>
            {category && (
              <>
                <span className="mx-2">&gt;</span>
                <Link to={`/category/${category.slug}`} className="hover:text-[#3483FA]">
                  {category.name}
                </Link>
              </>
            )}
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900 font-medium">
              {product.name} {product.variant && `- ${product.variant}`}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg border border-gray-200 p-4">
              <img
                src={images[currentImageIndex]}
                alt={`${product.name} ${product.variant || ''}`}
                className="w-full h-96 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder/600x600.png';
                }}
              />
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'border-[#3483FA]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Vista ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Badges */}
            <div>
              {product.featured && (
                <span className="inline-block bg-[#FFE600] text-black text-xs font-bold px-2 py-1 rounded mb-2">
                  MÁS VENDIDO
                </span>
              )}
              <h1 className="text-2xl font-normal text-gray-900 mb-2">
                {product.name} {product.variant && `- ${product.variant}`}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8) 1,234 opiniones</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-3xl font-normal text-gray-900">
                {formatPrice(product.price)}
              </p>
              <p className="text-[#00A650] text-lg">
                en 12x {formatPrice(product.price / 12)} sin interés
              </p>
            </div>

            {/* Stock and Shipping */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Stock disponible</span>
                <span className="text-sm text-[#00A650]">+25 disponibles</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-[#00A650]" />
                <span className="text-sm text-[#00A650] font-semibold">Envío gratis</span>
                <span className="text-xs bg-[#00A650] text-white px-1 py-0.5 rounded font-bold">FULL</span>
              </div>
              
              <p className="text-sm text-gray-600">Llega gratis mañana</p>
              
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#3483FA]" />
                <span className="text-sm text-[#3483FA]">Compra Protegida</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Cantidad:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href={product.buy_link || '#'}
                  onClick={handleBuyClick}
                  className="btn-primary w-full py-3 font-medium inline-block text-center"
                >
                  Comprar ahora
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#3483FA]">
                  <Heart className="w-5 h-5" />
                  <span>Agregar a favoritos</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#3483FA]">
                  <Share2 className="w-5 h-5" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        {product.description && (
          <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción del producto</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <Link to={`/producto/${relatedProduct.id}/${relatedProduct.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <img
                      src={relatedProduct.images?.[0] || '/placeholder/300x300.png'}
                      alt={relatedProduct.name}
                      className="w-full h-32 object-contain mb-2"
                    />
                    <h3 className="text-sm text-[#3483FA] hover:underline line-clamp-2 mb-2">
                      {relatedProduct.name} {relatedProduct.variant && `- ${relatedProduct.variant}`}
                    </h3>
                    <p className="text-lg font-normal text-gray-900">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;