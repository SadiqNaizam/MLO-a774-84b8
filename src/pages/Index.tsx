import React, { useState } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import QuestionCard from '../components/AssessmentModule/QuestionCard';
import { type RelevanceStatus } from '../components/AssessmentModule/ToggleGroup'; // Using 'type' for type-only import
import ResultsSummary from '../components/AssessmentModule/ResultsSummary';
import ScreenerNotes from '../components/AssessmentModule/ScreenerNotes';

interface Question {
  id: string;
  questionNumber: string;
  questionText: string;
  questionDetail?: string;
  relevance: RelevanceStatus;
}

const initialQuestionsData: Question[] = [
  {
    id: 'q1',
    questionNumber: '01',
    questionText: 'Tell me about a time when you adopted a new technology or tool on your own. What motivated you, and what was the result?',
    questionDetail: '(Looks for curiosity and initiative)',
    relevance: 'relevant' as const,
  },
  {
    id: 'q2',
    questionNumber: '02',
    questionText: 'How do you stay up to date with new trends or tools in your field? Have you come across anything AI-related?',
    questionDetail: '(Assesses awareness and interest)',
    relevance: 'non-relevant' as const,
  },
  {
    id: 'q3',
    questionNumber: '03',
    questionText: 'Have you experimented with any AI tools, even casually? (e.g., ChatGPT, image generators, automation bots)',
    questionDetail: '(Gauges willingness to experiment)',
    relevance: 'relevant' as const,
  },
  {
    id: 'q4',
    questionNumber: '04',
    questionText: 'Can you think of a repetitive or time-consuming task in your role that could benefit from automation or AI?',
    questionDetail: '(Tests ability to identify practical AI opportunities)',
    relevance: 'non-relevant' as const,
  },
  {
    id: 'q5',
    questionNumber: '05',
    questionText: 'Tell me about a time you had to change your way of working because of a new process or tool. How did you respond?',
    questionDetail: '(Evaluates adaptability)',
    relevance: 'relevant' as const,
  },
  {
    id: 'q6',
    questionNumber: '06',
    questionText: 'Can you open an AI tool of your choice and show me how you would use it to solve something or get a result? Pls walk me through the process, step by step',
    // No questionDetail for Q6 in the image sample.
    relevance: 'non-relevant' as const,
  },
];

const AssessmentModulePage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestionsData);
  const [screenerNotes, setScreenerNotes] = useState<string>('');

  const handleRelevanceChange = (questionId: string, newRelevance: RelevanceStatus) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === questionId ? { ...q, relevance: newRelevance } : q
      )
    );
  };

  const handleScreenerNotesChange = (notes: string) => {
    setScreenerNotes(notes);
  };

  // Prepare data for ResultsSummary: an array of objects with id and relevance
  const questionSummariesForResults = questions.map(q => ({ id: q.id, relevance: q.relevance }));

  return (
    <MainAppLayout>
      {/* Section for Questions List and its Header */}
      <div>
        {/* Header for the question list toggles (Relevant/Non-Relevant) */}
        {/* This header aligns with the structure of QuestionCard for consistent layout */}
        <div className="flex items-center py-4 border-b border-border">
          {/* Spacer for the question number column (matches QuestionCard's w-12 mr-3) */}
          <div className="w-12 mr-3 flex-shrink-0" />
          {/* Spacer for the question text column (matches QuestionCard's flex-grow mr-4) */}
          <div className="flex-grow mr-4" />
          {/* Labels for Relevant/Non-Relevant toggles (matches QuestionCard's ToggleGroup container) */}
          <div className="flex-shrink-0 w-[180px] flex justify-around items-center">
            <span className="text-sm font-semibold text-foreground">Relevant</span>
            <span className="text-sm font-semibold text-foreground">Non-Relevant</span>
          </div>
        </div>

        {/* List of QuestionCards */}
        {/* This div ensures QuestionCards are grouped and `last:border-b-0` works correctly on the last QuestionCard */}
        <div className="flex flex-col">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              questionNumber={question.questionNumber}
              questionText={question.questionText}
              questionDetail={question.questionDetail}
              relevance={question.relevance}
              onRelevanceChange={handleRelevanceChange}
            />
          ))}
        </div>
      </div>

      {/* Results Summary Section */}
      {/* ResultsSummary component handles its own top border (border-t) */}
      <ResultsSummary questions={questionSummariesForResults} />

      {/* Screener Notes Section */}
      {/* ScreenerNotes component handles its own top border (border-t) */}
      <ScreenerNotes value={screenerNotes} onChange={handleScreenerNotesChange} />
    </MainAppLayout>
  );
};

export default AssessmentModulePage;
