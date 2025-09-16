import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-border mt-auto", className)}>
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-xl">NoteMate</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NoteMate. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}