import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

export type AIQLevel = 'High' | 'Medium' | 'Low' | null;

interface QuestionSummary {
  id: string;
  relevance: 'relevant' | 'non-relevant' | null;
}

interface ResultsSummaryProps {
  questions: QuestionSummary[];
  className?: string;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ questions, className }) => {
  const calculateAIQLevel = React.useCallback((): AIQLevel => {
    if (!questions) return null;
    
    const totalQuestions = questions.length;
    if (totalQuestions === 0) return null; // Or 'Low' by default

    const relevantCount = questions.filter(q => q.relevance === 'relevant').length;
    const relevancePercentage = (relevantCount / totalQuestions) * 100;

    if (relevancePercentage >= 67) { // Approx 2/3 or more
      return 'High';
    } else if (relevancePercentage >= 34) { // Approx 1/3 to 2/3
      return 'Medium';
    } else {
      return 'Low';
    }
  }, [questions]);

  const aiqLevel = calculateAIQLevel();

  const renderLevelOption = (level: 'High' | 'Medium' | 'Low', currentAiqLevel: AIQLevel) => {
    const isChecked = level === currentAiqLevel;
    
    const checkboxClassName = cn(
      "h-5 w-5 rounded-sm border-2 cursor-default",
      "border-primaryText",
      "data-[state=checked]:bg-transparent",
      "data-[state=checked]:text-primary",
      "data-[state=checked]:border-primaryText",
      "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-background"
    );

    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`aiq-${level.toLowerCase()}`}
          checked={isChecked}
          disabled // Display only, not interactive
          className={checkboxClassName}
          aria-labelledby={`aiq-label-${level.toLowerCase()}`}
        />
        <span 
          id={`aiq-label-${level.toLowerCase()}`}
          className={cn(
            "text-base", // Consistent text size
            isChecked ? "text-primary font-medium" : "text-muted-foreground"
          )}
        >
          {level}
        </span>
      </div>
    );
  };

  return (
    <div className={cn("py-6 mt-6 border-t border-border", className)}>
      <div className="flex items-center">
        <span className="text-foreground font-medium text-base w-[110px] shrink-0">AIQ Level:</span>
        <div className="flex items-center space-x-5"> {/* Spacing for High, Medium, Low options */}
          {renderLevelOption('High', aiqLevel)}
          {renderLevelOption('Medium', aiqLevel)}
          {renderLevelOption('Low', aiqLevel)}
        </div>
      </div>
      {aiqLevel !== null && (
        <div className="mt-1.5">
          <p className="text-muted-foreground text-xs ml-[110px] pl-2"> 
            (Auto calculated using above inputs)
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsSummary;