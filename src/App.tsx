import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PromotionCountdown from './components/PromotionCountdown';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  // 简单的全局滚动恢复配置
  useEffect(() => {
    // 禁用浏览器的自动滚动恢复
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* 管理员路由，不包含header/footer */}
          <Route path="/admin" element={<AdminPage />} />
          
          {/* 常规路由，包含header/footer */}
          <Route path="/*" element={
            <>
              <Header />
              <PromotionCountdown />
              <main className="flex-1">
                <Routes>
                  {/* 核心页面 */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/categoria/:slug" element={<CategoryPage />} />
                  <Route path="/producto/:id/:slug?" element={<ProductDetailPage />} />
                  
                  {/* 404 页面 */}
                  <Route path="*" element={
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                      <div className="text-center max-w-md mx-auto p-6">
                        <div className="mb-6">
                          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-4xl text-gray-400">📱</span>
                          </div>
                          <h1 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
                          <p className="text-gray-600 mb-6">
                            Parece que esta página no existe. 
                            Te ayudamos a encontrar lo que buscas.
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <a 
                            href="/" 
                            className="block w-full bg-[#3483FA] text-white px-6 py-3 rounded-md hover:bg-[#2968C8] transition-colors"
                          >
                            Ver Todos los Productos
                          </a>
                        </div>
                      </div>
                    </div>
                  } />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;