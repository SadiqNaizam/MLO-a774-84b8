import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

export type RelevanceStatus = 'relevant' | 'non-relevant' | null;

interface ToggleGroupProps {
  idPrefix: string;
  value: RelevanceStatus;
  onChange: (value: RelevanceStatus) => void;
  className?: string;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ idPrefix, value, onChange, className }) => {
  const handleRelevantClick = () => {
    onChange(value === 'relevant' ? null : 'relevant');
  };

  const handleNonRelevantClick = () => {
    onChange(value === 'non-relevant' ? null : 'non-relevant');
  };

  const checkboxClassName = cn(
    "h-6 w-6 rounded-sm border-2 transition-all duration-150 ease-in-out",
    "border-primaryText", // Default border color (white-ish #F3F3F9)
    "data-[state=checked]:bg-transparent", // Keep background transparent when checked
    "data-[state=checked]:text-primary", // Checkmark color (accentTeal #2ECCBE)
    "data-[state=checked]:border-primaryText", // Border color when checked (same as unchecked, or use border-primary for emphasis)
    "hover:border-primary/80", // Hover effect
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
  );

  return (
    // This container's width effectively sets the width for the 'Relevant'/'Non-Relevant' columns per question
    // The image suggests these columns are roughly 80-100px wide each.
    // Using justify-around within a fixed-width container for the two checkboxes.
    <div className={cn("flex justify-around items-center w-[180px]", className)}> 
      {/* Relevant Checkbox Container (Implicit Column 1) */}
      <Checkbox
        id={`${idPrefix}-relevant`}
        checked={value === 'relevant'}
        onClick={handleRelevantClick} 
        className={checkboxClassName}
        aria-label="Mark as relevant"
      />
      {/* Non-Relevant Checkbox Container (Implicit Column 2) */}
      <Checkbox
        id={`${idPrefix}-non-relevant`}
        checked={value === 'non-relevant'}
        onClick={handleNonRelevantClick}
        className={checkboxClassName}
        aria-label="Mark as non-relevant"
      />
    </div>
  );
};

export default ToggleGroup;