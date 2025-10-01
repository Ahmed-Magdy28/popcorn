import { useEffect, useRef, useState } from 'react';
import { useKey } from './useKey';

export const useSearch = (setSearchQuery) => {
   const [query, setQuery] = useState('');
   const handleSubmit = (e) => {
      e.preventDefault();
      setSearchQuery(query);
      setQuery((_) => '');
   };

   const inputEl = useRef(null);

   useKey('Enter', () => {
      if (document.activeElement === inputEl.current) return;
      inputEl.current.focus();
      setSearchQuery(() => '');
   });

   return { query, setQuery, handleSubmit, inputEl };
};
