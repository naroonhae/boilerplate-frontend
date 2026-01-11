'use client';

import { useState } from 'react';

import PageContainer from '@/components/common/page-container';
import MyQuotesSection from '@/components/quotes/my-quotes-section';
import NotificationSettingsCard from '@/components/quotes/notification-settings-card';
import SharedQuotesSection from '@/components/quotes/shared-quotes-section';
import TodayQuoteCard from '@/components/quotes/today-quote-card';
import { useAuthStore } from '@/store/auth';

// Mock data - Will be replaced with API integration
const MOCK_TODAY_QUOTE = {
  id: 1,
  content: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
  author: 'Winston Churchill',
};

const MOCK_MY_QUOTES = [
  {
    id: 1,
    content: 'Never put off till tomorrow what you can do today.',
    author: 'Benjamin Franklin',
    createdAt: '2024-01-10',
    isShared: true,
  },
  {
    id: 2,
    content: 'While there is life, there is hope.',
    author: 'Cicero',
    createdAt: '2024-01-09',
    isShared: false,
  },
  {
    id: 3,
    content: 'Happiness is a habit. Cultivate it.',
    author: 'Elbert Hubbard',
    createdAt: '2024-01-08',
    isShared: true,
  },
];

const MOCK_SHARED_QUOTES = [
  {
    id: 1,
    content: 'An investment in knowledge pays the best interest.',
    author: 'Benjamin Franklin',
    createdBy: 'Alex Kim',
    likes: 24,
    isLiked: false,
    createdAt: '2024-01-10',
  },
  {
    id: 2,
    content: 'Whether you think you can or you think you cannot, you are right.',
    author: 'Henry Ford',
    createdBy: 'Sarah Lee',
    likes: 18,
    isLiked: true,
    createdAt: '2024-01-09',
  },
];

export default function Home() {
  const { isLoggedIn, member } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Temporary handlers - Will be replaced with API integration
  const handleRefreshQuote = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
    console.log('Refresh quote');
  };

  const handleDeleteQuote = (id: number) => {
    console.log('Delete quote:', id);
  };

  const handleToggleShare = (id: number) => {
    console.log('Toggle share:', id);
  };

  const handleLikeQuote = (id: number) => {
    console.log('Like quote:', id);
  };

  return (
    <PageContainer maxWidth="2xl">
      <div className="space-y-12 pb-12">
        {/* Welcome Message */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-clip-text text-accent">Daily Quotes</h1>
          <p className="text-muted-foreground">
            {isLoggedIn && member
              ? `Hey ${member.nickname}, ready for your daily wisdom?`
              : 'Your daily dose of inspiration starts here'}
          </p>
        </div>

        {/* Quote of the Day */}
        <TodayQuoteCard
          quote={isLoggedIn ? MOCK_TODAY_QUOTE : undefined}
          onRefresh={isLoggedIn ? handleRefreshQuote : undefined}
          isLoading={isRefreshing}
        />

        {/* Logged in sections */}
        {isLoggedIn && (
          <>
            {/* Notification Settings */}
            <NotificationSettingsCard isEnabled={false} />

            {/* My Quotes Section */}
            <MyQuotesSection
              quotes={MOCK_MY_QUOTES}
              onDelete={handleDeleteQuote}
              onToggleShare={handleToggleShare}
            />

            {/* Divider */}
            <div className="border-t" />

            {/* Shared Quotes Section */}
            <SharedQuotesSection quotes={MOCK_SHARED_QUOTES} onLike={handleLikeQuote} />
          </>
        )}

        {/* Guest CTA */}
        {!isLoggedIn && (
          <div className="text-center space-y-4 py-12">
            <h2 className="text-2xl font-bold">Build Your Personal Wisdom Library</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Sign in to save quotes, share with the community, and get daily notifications that
              inspire you.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <a
                href="/login"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="px-6 py-2 border border-border rounded-md hover:bg-accent transition-colors"
              >
                Create Account
              </a>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
