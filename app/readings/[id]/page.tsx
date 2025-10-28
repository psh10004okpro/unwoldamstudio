'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { readingsApi } from '@/lib/api/endpoints';
import { Reading } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, Heart, MessageCircle, Globe, Lock, Trash2 } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function ReadingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [reading, setReading] = useState<Reading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchReading(params.id as string);
    }
  }, [params.id]);

  const fetchReading = async (id: string) => {
    try {
      setLoading(true);
      const response = await readingsApi.getById(id);
      setReading(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.message || '리딩을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!reading) return;

    try {
      await readingsApi.toggleFavorite(reading.id);
      setReading({ ...reading, isFavorite: !reading.isFavorite });
    } catch (err: any) {
      alert(err.message || '즐겨찾기 설정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!reading) return;
    if (!confirm('정말 이 리딩을 삭제하시겠습니까?')) return;

    try {
      await readingsApi.delete(reading.id);
      router.push('/readings');
    } catch (err: any) {
      alert(err.message || '삭제에 실패했습니다.');
    }
  };

  const handleToggleVisibility = async () => {
    if (!reading) return;

    const newVisibility = reading.visibility === 'public' ? 'private' : 'public';
    try {
      await readingsApi.updateVisibility(reading.id, { visibility: newVisibility });
      setReading({ ...reading, visibility: newVisibility });
    } catch (err: any) {
      alert(err.message || '공개 설정 변경에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">리딩을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !reading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-destructive">{error || '리딩을 찾을 수 없습니다.'}</p>
          <Button asChild className="mt-4">
            <Link href="/readings">리딩 목록으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

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

  const positionNames: Record<string, string[]> = {
    'one-card': ['현재 상황'],
    'three-card': ['과거', '현재', '미래'],
    'celtic-cross': [
      '현재 상황',
      '도전과 장애',
      '의식적 목표',
      '무의식적 기반',
      '최근 과거',
      '가까운 미래',
      '당신의 태도',
      '주변 환경',
      '희망과 두려움',
      '최종 결과',
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/readings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          리딩 목록으로
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{reading.question}</h1>
            <div className="flex gap-2 flex-wrap mb-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {spreadTypeLabels[reading.spreadType]}
              </span>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {categoryLabels[reading.category]}
              </span>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded flex items-center gap-1">
                {reading.visibility === 'public' ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                {reading.visibility === 'public' ? '공개' : '비공개'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDateTime(reading.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={reading.isFavorite ? 'default' : 'outline'}
            size="sm"
            onClick={handleToggleFavorite}
            className="gap-2"
          >
            <Heart className={`h-4 w-4 ${reading.isFavorite ? 'fill-current' : ''}`} />
            {reading.isFavorite ? '즐겨찾기 해제' : '즐겨찾기'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleVisibility}
            className="gap-2"
          >
            {reading.visibility === 'public' ? <Lock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
            {reading.visibility === 'public' ? '비공개로 전환' : '공개로 전환'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            삭제
          </Button>
        </div>
      </div>

      {/* Cards */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>뽑은 카드</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {reading.cards.map((cardData, index) => (
              <div key={index} className="text-center">
                <div className="aspect-[2/3] bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg flex items-center justify-center mb-2 p-4">
                  <div className={cardData.isReversed ? 'rotate-180' : ''}>
                    <div className="text-4xl mb-2">{cardData.card.value}</div>
                    <div className="text-xs font-medium">{cardData.card.nameShort}</div>
                  </div>
                </div>
                <p className="text-sm font-medium mb-1">
                  {positionNames[reading.spreadType]?.[index] || `${index + 1}번째 카드`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {cardData.card.name}
                  {cardData.isReversed && ' (역방향)'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>AI 해석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap">{reading.interpretation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              좋아요 {reading.likesCount}개
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              댓글 {reading.commentsCount}개
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
