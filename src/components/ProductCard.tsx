import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Heart, Truck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getImageUrl = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return '/placeholder/300x300.png';
  };

  const getProductUrl = () => {
    const slug = `${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.variant?.toLowerCase().replace(/\s+/g, '-') || ''}`;
    return `/producto/${product.id}/${slug}`;
  };

  return (
    <div className="bg-white border border-[#E6E6E6] rounded-lg hover:shadow-lg transition-shadow duration-200 p-2 md:p-4">
      {/* Product Image */}
      <div className="relative mb-2 md:mb-4">
        <Link to={getProductUrl()}>
          <img
            src={getImageUrl()}
            alt={`${product.name} ${product.variant || ''}`}
            className="w-full h-36 md:h-48 object-contain rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder/300x300.png';
            }}
          />
        </Link>
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-[#FFE600] text-[#333333] text-xs font-bold px-1 md:px-2 py-0.5 md:py-1 rounded" style={{ fontSize: '10px' }}>
            <span className="hidden md:inline">MÁS VENDIDO</span>
            <span className="md:hidden">TOP</span>
          </div>
        )}
        
        {/* Pinned Badge */}
        {product.is_pinned && (
          <div className="absolute top-6 left-1 md:top-8 md:left-2 bg-red-500 text-white text-xs font-bold px-1 md:px-2 py-0.5 md:py-1 rounded" style={{ fontSize: '10px' }}>
            <span className="hidden md:inline">DESTACADO</span>
            <span className="md:hidden">⭐</span>
          </div>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-1 right-1 md:top-2 md:right-2 p-1 md:p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="w-3 h-3 md:w-4 md:h-4 text-[#666666] hover:text-red-500" />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-1 md:space-y-2">
        {/* Title */}
        <Link to={getProductUrl()}>
          <h3 className="text-xs md:text-sm font-normal text-[#3483FA] hover:underline line-clamp-2" style={{ fontSize: '12px', lineHeight: '1.35' }}>
            <span className="md:text-sm">{product.name} {product.variant && `${product.variant}`}</span>
          </h3>
        </Link>

        {/* Price */}
        <div className="space-y-0.5 md:space-y-1">
          <p className="text-lg md:text-2xl font-normal text-[#333333]" style={{ fontSize: '18px' }}>
            <span className="md:text-2xl">{formatPrice(product.price)}</span>
          </p>
          
          {/* Discount Price */}
          {Math.random() > 0.5 && (
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="text-[#00A650] text-xs font-bold" style={{ fontSize: '10px' }}>22% OFF</span>
              <span className="text-[#999999] line-through text-xs" style={{ fontSize: '10px' }}>
                {formatPrice(product.price * 1.3)}
              </span>
            </div>
          )}
          
          {/* Installments */}
          <p className="text-[#00A650] text-xs md:text-sm" style={{ fontSize: '11px' }}>
            <span className="md:text-sm">en 12x {formatPrice(product.price / 12)} sin interés</span>
          </p>
        </div>

        {/* Shipping */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <Truck className="w-3 h-3 md:w-4 md:h-4 text-[#00A650]" />
          <span className="text-[#00A650] font-semibold text-xs md:text-sm" style={{ fontSize: '11px' }}>
            <span className="md:text-sm">Envío gratis</span>
          </span>
          <span className="text-xs bg-[#00A650] text-white px-1 py-0.5 rounded font-bold" style={{ fontSize: '9px' }}>FULL</span>
        </div>
        
        <p className="text-[#00A650] text-xs" style={{ fontSize: '10px' }}>
          <span className="md:text-xs">Llega gratis mañana</span>
        </p>

        {/* Status */}
        <p className="text-[#666666] text-xs" style={{ fontSize: '10px' }}>
          <span className="md:text-xs">Nuevo | +25 vendidos</span>
        </p>

        {/* Action Buttons */}
        <div className="pt-1 md:pt-2 space-y-2">
          <Link
            to={getProductUrl()}
            className="btn-primary block w-full text-center py-1.5 md:py-2 rounded-md font-medium text-xs md:text-sm"
          >
            <span className="md:hidden">Ver</span>
            <span className="hidden md:inline">Ver producto</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;