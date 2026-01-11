'use client';

import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TodayQuoteCardProps {
  quote?: {
    id: number;
    content: string;
    author: string;
  };
  onRefresh?: () => void;
  isLoading?: boolean;
}

export default function TodayQuoteCard({ quote, onRefresh, isLoading }: TodayQuoteCardProps) {
  const defaultQuote = {
    content: 'Start your day with a favorite quote',
    author: 'Daily Quotes',
  };

  const displayQuote = quote || defaultQuote;

  return (
    <Card className="relative overflow-hidden border-2 border-primary/20 bg-transparent bg-linear-to-br from-primary/5 to-accent/5">
      <CardContent className="pt-12 pb-8 px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-4xl">💡</span>
          </div>

          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground">
              "{displayQuote.content}"
            </p>
            <p className="text-lg text-muted-foreground">- {displayQuote.author}</p>
          </div>

          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="mt-4"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Surprise me with another
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
