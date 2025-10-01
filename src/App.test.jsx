/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Vite + React heading', () => {
   render(<App />);
   const element = screen.getByText(/Vite \+ React/i); // <- matches <h1>Vite + React</h1>
   expect(element).toBeInTheDocument();
});
