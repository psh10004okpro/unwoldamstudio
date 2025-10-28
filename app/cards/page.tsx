'use client';

import { useEffect, useState } from 'react';
import { cardsApi } from '@/lib/api/endpoints';
import { TarotCard as TarotCardType, CardFilters, ArcanaType, SuitType } from '@/lib/types';
import { TarotCard } from '@/components/cards/tarot-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

export default function CardsPage() {
  const [cards, setCards] = useState<TarotCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArcana, setSelectedArcana] = useState<ArcanaType | 'all'>('all');
  const [selectedSuit, setSelectedSuit] = useState<SuitType | 'all'>('all');

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArcana, selectedSuit]);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const filters: CardFilters = {};

      if (selectedArcana !== 'all') {
        filters.arcana = selectedArcana;
      }

      if (selectedSuit !== 'all') {
        filters.suit = selectedSuit;
      }

      const response = await cardsApi.getAll(filters);
      setCards(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.message || '카드를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchCards();
      return;
    }

    try {
      setLoading(true);
      const response = await cardsApi.search(searchQuery);
      setCards(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.message || '검색에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const filteredCards = cards.filter(card => {
    if (searchQuery && !card.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">타로 카드 목록</h1>
        <p className="text-muted-foreground">
          78장의 타로 카드를 탐색하고 각 카드의 의미를 알아보세요
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="카드 이름으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>
            검색
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex gap-2">
            <Button
              variant={selectedArcana === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedArcana('all')}
            >
              전체
            </Button>
            <Button
              variant={selectedArcana === 'major' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedArcana('major')}
            >
              메이저 아르카나
            </Button>
            <Button
              variant={selectedArcana === 'minor' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedArcana('minor')}
            >
              마이너 아르카나
            </Button>
          </div>

          {selectedArcana === 'minor' && (
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedSuit === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSuit('all')}
              >
                모든 수트
              </Button>
              <Button
                variant={selectedSuit === 'wands' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSuit('wands')}
              >
                완드
              </Button>
              <Button
                variant={selectedSuit === 'cups' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSuit('cups')}
              >
                컵
              </Button>
              <Button
                variant={selectedSuit === 'swords' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSuit('swords')}
              >
                소드
              </Button>
              <Button
                variant={selectedSuit === 'pentacles' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSuit('pentacles')}
              >
                펜타클
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">카드를 불러오는 중...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive">{error}</p>
          <Button onClick={fetchCards} className="mt-4">
            다시 시도
          </Button>
        </div>
      ) : filteredCards.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">카드를 찾을 수 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredCards.length}장의 카드
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredCards.map((card) => (
              <TarotCard key={card.id} card={card} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
