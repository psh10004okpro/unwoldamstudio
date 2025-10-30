'use client';

import { useEffect, useState } from 'react';
import { publicReadingsApi, readingsApi } from '@/lib/api/endpoints';
import { Reading, CategoryType, PublicReadingFilters } from '@/lib/types/index';
import { ReadingCard } from '@/components/readings/reading-card';
import { Button } from '@/components/ui/button';
import { Filter, TrendingUp, Clock, Heart } from 'lucide-react';

export default function FeedPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [selectedSort, setSelectedSort] = useState<'recent' | 'popular' | 'trending'>('recent');

  useEffect(() => {
    fetchPublicReadings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedSort]);

  const fetchPublicReadings = async () => {
    try {
      setLoading(true);
      const filters: PublicReadingFilters = {
        sort: selectedSort,
      };

      if (selectedCategory !== 'all') {
        filters.category = selectedCategory;
      }

      const response = await publicReadingsApi.getPublicReadings(filters);
      setReadings(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.message || '공개 리딩을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      // Optimistic update
      setReadings(readings.map(r => {
        if (r.id === id) {
          const isLiked = r.isLikedByUser;
          return {
            ...r,
            isLikedByUser: !isLiked,
            likesCount: isLiked ? r.likesCount - 1 : r.likesCount + 1,
          };
        }
        return r;
      }));

      // API call
      await readingsApi.like(id);
    } catch (err: any) {
      // Revert on error
      fetchPublicReadings();
      alert(err.message || '좋아요 처리에 실패했습니다.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">커뮤니티 피드</h1>
        <p className="text-muted-foreground">
          다른 사용자들의 타로 리딩을 둘러보고 소통하세요
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">필터:</span>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSort === 'recent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSort('recent')}
          >
            <Clock className="mr-2 h-4 w-4" />
            최신순
          </Button>
          <Button
            variant={selectedSort === 'popular' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSort('popular')}
          >
            <Heart className="mr-2 h-4 w-4" />
            인기순
          </Button>
          <Button
            variant={selectedSort === 'trending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSort('trending')}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            트렌딩
          </Button>
        </div>

        {/* Category Filters */}
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
      </div>

      {/* Readings List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">공개 리딩을 불러오는 중...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive">{error}</p>
          <Button onClick={fetchPublicReadings} className="mt-4">
            다시 시도
          </Button>
        </div>
      ) : readings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">아직 공개된 리딩이 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            총 {readings.length}개의 공개 리딩
          </div>
          <div className="grid gap-6">
            {readings.map((reading) => (
              <ReadingCard
                key={reading.id}
                reading={reading}
                onLike={handleLike}
                showCommunityFeatures={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
