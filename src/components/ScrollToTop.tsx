import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 简单可靠的ScrollToTop组件
 * 使用单次延迟滚动重置来避免冲突
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 简单的滚动到顶部，延迟一小段时间以确保DOM准备就绪
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 0);

    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;