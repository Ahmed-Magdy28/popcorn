import { useEffect } from 'react';

export const useKey = (key: string, action: () => void): void => {
   useEffect(() => {
      const handlePress = (e: KeyboardEvent) => {
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
