import React from 'react';
import { cn } from '@/lib/utils';
import ToggleGroup, { RelevanceStatus } from './ToggleGroup';

interface QuestionCardProps {
  questionNumber: string;
  questionText: string;
  questionDetail?: string;
  relevance: RelevanceStatus;
  onRelevanceChange: (questionId: string, newRelevance: RelevanceStatus) => void;
  id: string; // Unique ID for the question
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  questionText,
  questionDetail,
  relevance,
  onRelevanceChange,
  id,
  className,
}) => {
  const handleToggleChange = (newRelevance: RelevanceStatus) => {
    onRelevanceChange(id, newRelevance);
  };

  return (
    <div className={cn("flex items-start py-4 border-b border-border last:border-b-0", className)}>
      <div className="w-12 mr-3 flex-shrink-0 pt-0.5"> {/* Adjusted width and padding for number */} 
        <span className="text-xl font-bold text-primary">{questionNumber}</span>
      </div>
      <div className="flex-grow mr-4">
        <p className="text-foreground text-base leading-relaxed">{questionText}</p>
        {questionDetail && (
          <p className="text-muted-foreground text-sm mt-1 italic">{questionDetail}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        <ToggleGroup
          idPrefix={`q-${id}`}
          value={relevance}
          onChange={handleToggleChange}
        />
      </div>
    </div>
  );
};

export default QuestionCard;