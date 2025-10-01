import { Logo } from './Logo.jsx';

export function NavBar({ children }) {
   return (
      <nav className="nav-bar">
         <Logo />
         {children}
      </nav>
   );
}
