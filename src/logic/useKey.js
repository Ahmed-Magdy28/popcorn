import { useEffect } from 'react';

export const useKey = (key, action) => {
   useEffect(() => {
      const handlePress = (e) => {
         if (e.key.toLowerCase() === key.toLowerCase()) {
            action();
         }
      };

      document.addEventListener('keydown', handlePress);

      return () => {
         document.removeEventListener('keydown', handlePress);
      };
   }, [action, key]);
};
