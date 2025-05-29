import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        'bg-card text-foreground relative flex h-20 flex-col items-center justify-center px-6 py-6',
        // Layout Requirements: header.position: "relative top-0 inset-x-0"
        // These are somewhat redundant for a flex item in normal flow but included as specified.
        'top-0 inset-x-0',
        className
      )}
    >
      <h1 className="text-xl font-semibold text-foreground">
        AI QUOTIENT (AIQ) ASSESSMENT
      </h1>
      <p className="text-sm text-muted-foreground">
        SCREENING AI-FRIENDLY TALENT
      </p>
    </header>
  );
};

export default Header;
