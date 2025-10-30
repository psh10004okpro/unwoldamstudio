import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reading } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';
import Link from 'next/link';
import { Heart, MessageCircle, Eye, Trash2, Lock, Globe, User } from 'lucide-react';

interface ReadingCardProps {
  reading: Reading;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onLike?: (id: string) => void;
  showActions?: boolean;
  showCommunityFeatures?: boolean;
}

export function ReadingCard({
  reading,
  onDelete,
  onToggleFavorite,
  onLike,
  showActions = true,
  showCommunityFeatures = false
}: ReadingCardProps) {
  const spreadTypeLabels = {
    'one-card': '원 카드',
    'three-card': '쓰리 카드',
    'celtic-cross': '켈틱 크로스',
  };

  const categoryLabels = {
    'love': '연애',
    'career': '커리어',
    'health': '건강',
    'general': '일반',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        {showCommunityFeatures && reading.user && (
          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{reading.user.username}</span>
          </div>
        )}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{reading.question}</CardTitle>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {spreadTypeLabels[reading.spreadType]}
              </span>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {categoryLabels[reading.category]}
              </span>
              {!showCommunityFeatures && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded flex items-center gap-1">
                  {reading.visibility === 'public' ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                  {reading.visibility === 'public' ? '공개' : '비공개'}
                </span>
              )}
            </div>
          </div>
          {!showCommunityFeatures && reading.isFavorite && (
            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-2">뽑은 카드:</p>
            <div className="flex gap-2 flex-wrap">
              {reading.cards.map((cardData, index) => (
                <div key={index} className="text-xs bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 px-3 py-2 rounded">
                  {cardData.card.name}
                  {cardData.isReversed && ' (역)'}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">AI 해석:</p>
            <p className="text-sm line-clamp-3">{reading.interpretation}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex gap-4 text-xs text-muted-foreground">
          {showCommunityFeatures && onLike ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onLike(reading.id)}
              className="flex items-center gap-1 px-2"
            >
              <Heart className={`h-4 w-4 ${reading.isLikedByUser ? 'fill-red-500 text-red-500' : ''}`} />
              <span className={reading.isLikedByUser ? 'text-red-500' : ''}>{reading.likesCount}</span>
            </Button>
          ) : (
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {reading.likesCount}
            </div>
          )}
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {reading.commentsCount}
          </div>
          <div className="text-xs">{formatDateTime(reading.createdAt)}</div>
        </div>
        {showActions && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href={`/readings/${reading.id}`}>
                <Eye className="h-3 w-3 mr-1" />
                보기
              </Link>
            </Button>
            {onToggleFavorite && !showCommunityFeatures && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onToggleFavorite(reading.id)}
              >
                <Heart className={`h-4 w-4 ${reading.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(reading.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
