'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cardsApi, readingsApi } from '@/lib/api/endpoints';
import { TarotCard, CategoryType, SpreadType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { Sparkles, ArrowLeft, Shuffle } from 'lucide-react';
import Link from 'next/link';

export default function NewReadingPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState<CategoryType>('general');
  const [spreadType, setSpreadType] = useState<SpreadType>('one-card');
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  const spreadTypeInfo = {
    'one-card': { name: '원 카드', count: 1, description: '간단한 질문이나 오늘의 운세' },
    'three-card': { name: '쓰리 카드', count: 3, description: '과거-현재-미래 또는 상황-행동-결과' },
    'celtic-cross': { name: '켈틱 크로스', count: 10, description: '복잡한 상황에 대한 깊이 있는 분석' },
  };

  const categoryLabels = {
    'love': '연애',
    'career': '커리어',
    'health': '건강',
    'general': '일반',
  };

  const handleDrawCards = async () => {
    try {
      setLoading(true);
      setError('');
      const count = spreadTypeInfo[spreadType].count;
      const response = await cardsApi.getRandom(count);
      setDrawnCards(response.data.data);
      setStep(3);
    } catch (err: any) {
      setError(err.message || '카드를 뽑는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReading = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await readingsApi.create({
        question,
        category,
        spreadType,
        cardIds: drawnCards.map(card => card.nameShort),
      });

      router.push(`/readings/${response.data.data.id}`);
    } catch (err: any) {
      setError(err.message || '리딩 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/readings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          리딩 목록으로
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">새 타로 리딩</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary font-medium' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              1
            </span>
            질문하기
          </div>
          <span>→</span>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary font-medium' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              2
            </span>
            카드 뽑기
          </div>
          <span>→</span>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary font-medium' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              3
            </span>
            해석 받기
          </div>
        </div>
      </div>

      {/* Step 1: Question & Settings */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>질문과 설정</CardTitle>
            <CardDescription>
              타로에게 묻고 싶은 질문을 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question">질문</Label>
              <Input
                id="question"
                placeholder="예: 나의 연애운은 어떨까요?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>카테고리</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(Object.keys(categoryLabels) as CategoryType[]).map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? 'default' : 'outline'}
                    onClick={() => setCategory(cat)}
                  >
                    {categoryLabels[cat]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>스프레드 타입</Label>
              <div className="space-y-2">
                {(Object.keys(spreadTypeInfo) as SpreadType[]).map((spread) => (
                  <Card
                    key={spread}
                    className={`cursor-pointer transition-all ${spreadType === spread ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSpreadType(spread)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{spreadTypeInfo[spread].name}</p>
                          <p className="text-sm text-muted-foreground">
                            {spreadTypeInfo[spread].description}
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {spreadTypeInfo[spread].count}장
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!question.trim()}
              className="w-full"
              size="lg"
            >
              다음
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Draw Cards */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>카드 뽑기</CardTitle>
            <CardDescription>
              {spreadTypeInfo[spreadType].count}장의 카드를 뽑습니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary" />
              <p className="text-lg mb-2">질문: {question}</p>
              <p className="text-sm text-muted-foreground mb-8">
                {spreadTypeInfo[spreadType].name} • {categoryLabels[category]}
              </p>

              <Button
                onClick={handleDrawCards}
                disabled={loading}
                size="lg"
                className="gap-2"
              >
                <Shuffle className="h-5 w-5" />
                {loading ? '카드를 뽑는 중...' : '카드 뽑기'}
              </Button>

              {error && (
                <div className="mt-4 text-sm text-destructive">
                  {error}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                이전
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Show Cards & Create Reading */}
      {step === 3 && drawnCards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>뽑은 카드</CardTitle>
            <CardDescription>
              AI가 카드를 해석하고 있습니다...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-4">질문: {question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {drawnCards.map((card, index) => (
                  <div key={index} className="text-center">
                    <div className="aspect-[2/3] bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg flex items-center justify-center mb-2 p-4">
                      <div>
                        <div className="text-4xl mb-2">{card.value}</div>
                        <div className="text-xs font-medium">{card.nameShort}</div>
                      </div>
                    </div>
                    <p className="text-sm font-medium">{card.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive text-center bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1"
                disabled={loading}
              >
                다시 뽑기
              </Button>
              <Button
                onClick={handleCreateReading}
                disabled={loading}
                className="flex-1 gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {loading ? 'AI 해석 중...' : 'AI 해석 받기'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
