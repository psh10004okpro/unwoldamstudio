'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { cardsApi } from '@/lib/api/endpoints';
import { TarotCard } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CardDetailPage() {
  const params = useParams();
  const [card, setCard] = useState<TarotCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchCard(params.id as string);
    }
  }, [params.id]);

  const fetchCard = async (id: string) => {
    try {
      setLoading(true);
      const response = await cardsApi.getById(id);
      setCard(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.message || '카드를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">카드를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-destructive">{error || '카드를 찾을 수 없습니다.'}</p>
          <Button asChild className="mt-4">
            <Link href="/cards">카드 목록으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/cards">
          <ArrowLeft className="mr-2 h-4 w-4" />
          카드 목록으로
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Card Image */}
        <div>
          <Card className="overflow-hidden">
            <div className="aspect-[2/3] bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-8xl mb-4">{card.value}</div>
                <div className="text-2xl font-medium">{card.nameShort}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Card Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{card.name}</h1>
            <div className="flex gap-2 flex-wrap mb-4">
              <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">
                {card.arcana === 'major' ? '메이저 아르카나' : '마이너 아르카나'}
              </span>
              {card.suit && (
                <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded">
                  {card.suit}
                </span>
              )}
            </div>
            <p className="text-muted-foreground">{card.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>정방향 의미</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{card.meanings.upright}</p>
              <div className="flex flex-wrap gap-2">
                {card.keywords.upright.map((keyword, index) => (
                  <span
                    key={index}
                    className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>역방향 의미</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{card.meanings.reversed}</p>
              <div className="flex flex-wrap gap-2">
                {card.keywords.reversed.map((keyword, index) => (
                  <span
                    key={index}
                    className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
