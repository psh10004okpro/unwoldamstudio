'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { readingsApi } from '@/lib/api/endpoints';
import { Reading, ReadingFilters, CategoryType, SpreadType } from '@/lib/types';
import { ReadingCard } from '@/components/readings/reading-card';
import { ReadingCardSkeleton } from '@/components/readings/reading-card-skeleton';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

export default function ReadingsPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [selectedSpreadType, setSelectedSpreadType] = useState<SpreadType | 'all'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchReadings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, selectedCategory, selectedSpreadType, showFavoritesOnly]);

  const fetchReadings = async () => {
    try {
      setLoading(true);
      const filters: ReadingFilters = {};

      if (selectedCategory !== 'all') {
        filters.category = selectedCategory;
      }

      if (selectedSpreadType !== 'all') {
        filters.spreadType = selectedSpreadType;
      }

      if (showFavoritesOnly) {
        filters.isFavorite = true;
      }

      const response = await readingsApi.getMyReadings(filters);
      setReadings(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.message || '리딩을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 이 리딩을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await readingsApi.delete(id);
      setReadings(readings.filter(r => r.id !== id));
      toast.success('리딩이 삭제되었습니다');
    } catch (err: any) {
      toast.error(err.message || '삭제에 실패했습니다.');
    }
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      await readingsApi.toggleFavorite(id);
      setReadings(readings.map(r =>
        r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
      ));
      toast.success('즐겨찾기가 업데이트되었습니다');
    } catch (err: any) {
      toast.error(err.message || '즐겨찾기 설정에 실패했습니다.');
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">내 리딩 목록</h1>
          <p className="text-muted-foreground">
            나의 타로 리딩 기록을 확인하고 관리하세요
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/readings/new">
            <Plus className="mr-2 h-5 w-5" />
            새 리딩
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">필터:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={showFavoritesOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            즐겨찾기만
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            전체 카테고리
          </Button>
          <Button
            variant={selectedCategory === 'love' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('love')}
          >
            연애
          </Button>
          <Button
            variant={selectedCategory === 'career' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('career')}
          >
            커리어
          </Button>
          <Button
            variant={selectedCategory === 'health' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('health')}
          >
            건강
          </Button>
          <Button
            variant={selectedCategory === 'general' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('general')}
          >
            일반
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSpreadType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSpreadType('all')}
          >
            전체 스프레드
          </Button>
          <Button
            variant={selectedSpreadType === 'one-card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSpreadType('one-card')}
          >
            원 카드
          </Button>
          <Button
            variant={selectedSpreadType === 'three-card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSpreadType('three-card')}
          >
            쓰리 카드
          </Button>
          <Button
            variant={selectedSpreadType === 'celtic-cross' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSpreadType('celtic-cross')}
          >
            켈틱 크로스
          </Button>
        </div>
      </div>

      {/* Readings List */}
      {loading ? (
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <ReadingCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive">{error}</p>
          <Button onClick={fetchReadings} className="mt-4">
            다시 시도
          </Button>
        </div>
      ) : readings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">아직 리딩이 없습니다.</p>
          <Button asChild>
            <Link href="/readings/new">첫 리딩 만들기</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            총 {readings.length}개의 리딩
          </div>
          <div className="grid gap-6">
            {readings.map((reading) => (
              <ReadingCard
                key={reading.id}
                reading={reading}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
