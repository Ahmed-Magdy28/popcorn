import { Logo } from './Logo';

interface NavBarProps {
   children: React.ReactNode;
}

export function NavBar({ children }: NavBarProps) {
   return (
      <nav className="nav-bar">
         <Logo />
         {children}
      </nav>
   );
}
