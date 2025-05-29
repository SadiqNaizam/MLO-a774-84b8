import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ScreenerNotesProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const ScreenerNotes: React.FC<ScreenerNotesProps> = ({
  value,
  onChange,
  className,
  placeholder = "Enter screener notes and comments here..."
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={cn("py-6 mt-6 border-t border-border space-y-3", className)}>
      <Label htmlFor="screener-notes" className="text-foreground font-medium text-base">
        Screener Notes / Comments:
      </Label>
      <Textarea
        id="screener-notes"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "min-h-[120px] w-full rounded-md border border-input bg-background p-3 text-base text-foreground shadow-sm resize-y",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ring-offset-background placeholder:text-muted-foreground"
        )}
        rows={5} 
      />
    </div>
  );
};

export default ScreenerNotes;