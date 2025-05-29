import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header'; // CRITICAL: Relative path for project component

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('flex h-screen w-full flex-col bg-background', className)}>
      <Header />
      {/* 
        Overall Sizing for mainContent: "flex-1 overflow-y-auto px-6"
        This applies to the <main> scrollable container.
      */}
      <main className="flex-1 overflow-y-auto px-6">
        {/* 
          Layout for mainContent's inner div: "p-6 flex flex-col gap-6 bg-background"
          This div wraps the children and provides padding and flex layout for them.
        */}
        <div className="flex flex-col gap-6 bg-background p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
