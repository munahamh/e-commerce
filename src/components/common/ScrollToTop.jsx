import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // هذا الخطاف (Hook) يعطينا معلومات الصفحة الحالية
  const { pathname } = useLocation();

  useEffect(() => {
    // كلما تغير "pathname" (رابط الصفحة)، نقوم برفع الصفحة للأعلى
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // هذا المكون لا يعرض شيئاً على الشاشة
};

export default ScrollToTop;