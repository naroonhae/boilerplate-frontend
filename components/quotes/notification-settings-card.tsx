'use client';

import { Bell, Clock } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface NotificationSettingsCardProps {
  isEnabled?: boolean;
  scheduledTime?: string;
}

export default function NotificationSettingsCard({
  isEnabled = false,
  scheduledTime,
}: NotificationSettingsCardProps) {
  return (
    <Card className="border-accent/20 bg-linear-to-br from-accent/5 to-background">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Daily Inspiration Alerts
            </CardTitle>
            <CardDescription>
              Get your dose of wisdom at your perfect time
            </CardDescription>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isEnabled
                ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {isEnabled ? 'Active' : 'Off'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isEnabled && scheduledTime ? (
            <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Notification Time</p>
                <p className="text-lg font-bold text-primary">{scheduledTime}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No notifications yet. Set up your daily reminder and never miss your moment of inspiration!
            </p>
          )}

          <Button asChild className="w-full">
            <Link href="/settings/notifications">
              {isEnabled ? 'Change Time' : 'Set Up Notifications'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
