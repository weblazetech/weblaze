import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout> | null = null;
    let timer2: ReturnType<typeof setTimeout> | null = null;

    if (hash) {
      const targetId = hash.replace('#', '');
      const scrollToElement = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToElement()) {
        // Retry after microtask / brief render interval if page is transitioning
        timer1 = setTimeout(() => {
          if (!scrollToElement()) {
            timer2 = setTimeout(scrollToElement, 200);
          }
        }, 60);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [pathname, hash]);

  return null;
}
