import { useRef, useState } from 'react';
import { useKey } from './useKey';

export const useSearch = (setSearchQuery: (query: string) => void) => {
   const [query, setQuery] = useState('');
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSearchQuery(query);
      setQuery((_) => '');
   };

   const inputEl = useRef<HTMLInputElement>(null);

   useKey('Enter', () => {
      if (document.activeElement === inputEl.current) return;
      if (!inputEl.current) return;
      inputEl.current.focus();
      setSearchQuery('');
   });

   return { query, setQuery, handleSubmit, inputEl };
};
