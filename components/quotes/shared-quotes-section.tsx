'use client';

import { Heart, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SharedQuote {
  id: number;
  content: string;
  author: string;
  createdBy: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

interface SharedQuotesSectionProps {
  quotes?: SharedQuote[];
  onLike?: (id: number) => void;
}

export default function SharedQuotesSection({ quotes = [], onLike }: SharedQuotesSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Community Wisdom</h2>
          <p className="text-muted-foreground text-sm mt-1">Quotes shared by the community</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/shared">
            <Users className="w-4 h-4 mr-2" />
            Explore All
          </Link>
        </Button>
      </div>

      {quotes.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">The community is just getting started</p>
                <p className="text-sm text-muted-foreground">
                  Be the first to share your favorite quote!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {quotes.slice(0, 5).map((quote) => (
            <Card key={quote.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg leading-relaxed">{quote.content}</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-2">
                      <span>- {quote.author}</span>
                      <span className="text-xs">•</span>
                      <span className="text-xs">shared by {quote.createdBy}</span>
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 shrink-0"
                    onClick={() => onLike?.(quote.id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${quote.isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                    />
                    <span className="text-sm">{quote.likes}</span>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {quotes.length > 5 && (
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/shared">
              <TrendingUp className="w-4 h-4 mr-2" />
              See What's Trending
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}
