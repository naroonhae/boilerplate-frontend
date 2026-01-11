'use client';

import { Heart, Plus, Share2, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Quote {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  isShared: boolean;
}

interface MyQuotesSectionProps {
  quotes?: Quote[];
  onDelete?: (id: number) => void;
  onToggleShare?: (id: number) => void;
}

export default function MyQuotesSection({ quotes = [], onDelete, onToggleShare }: MyQuotesSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Collection</h2>
          <p className="text-muted-foreground text-sm mt-1">Your personal wisdom vault</p>
        </div>
        <Button asChild>
          <Link href="/quotes/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Quote
          </Link>
        </Button>
      </div>

      {quotes.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">Your collection is feeling lonely</p>
                <p className="text-sm text-muted-foreground">
                  Add your first quote and start building your daily inspiration
                </p>
              </div>
              <Button asChild className="mt-4">
                <Link href="/quotes/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Quote
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quotes.slice(0, 6).map((quote) => (
            <Card key={quote.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base line-clamp-2">{quote.content}</CardTitle>
                    <CardDescription className="mt-2">- {quote.author}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onToggleShare?.(quote.id)}
                    >
                      <Share2
                        className={`w-4 h-4 ${quote.isShared ? 'text-primary' : 'text-muted-foreground'}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:text-destructive"
                      onClick={() => onDelete?.(quote.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {quotes.length > 6 && (
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/quotes">View All {quotes.length} Quotes</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
