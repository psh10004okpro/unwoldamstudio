'use client';

import Image from 'next/image';
import { TarotCard } from '@/lib/types';
import { useState } from 'react';

interface CardImageProps {
  card: TarotCard;
  isReversed?: boolean;
  className?: string;
}

export function CardImage({ card, isReversed = false, className = '' }: CardImageProps) {
  const [imageError, setImageError] = useState(false);

  // 카드 타입별 색상 (fallback용)
  const getCardColors = () => {
    if (card.arcana === 'major') {
      return {
        from: '#8B5CF6', // purple-500
        to: '#6366F1',   // indigo-500
      };
    }

    switch (card.suit) {
      case 'wands':
        return { from: '#EF4444', to: '#F97316' }; // red to orange
      case 'cups':
        return { from: '#3B82F6', to: '#06B6D4' }; // blue to cyan
      case 'swords':
        return { from: '#6B7280', to: '#4B5563' }; // gray
      case 'pentacles':
        return { from: '#10B981', to: '#059669' }; // green
      default:
        return { from: '#8B5CF6', to: '#6366F1' };
    }
  };

  const colors = getCardColors();
  const rotate = isReversed ? 'rotate-180' : '';
  const imageUrl = `/cards/${card.nameShort.toLowerCase()}.jpg`;

  // 이미지가 없거나 로드 실패 시 그라데이션 표시
  if (imageError) {
    return (
      <div className={`aspect-[2/3] relative overflow-hidden rounded-lg ${rotate} ${className}`}>
        {/* Background Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
          }}
        />

        {/* Card Border */}
        <div className="absolute inset-2 border-4 border-white/20 rounded-md" />

        {/* Card Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
          {/* Card Value */}
          <div className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-lg">
            {card.value}
          </div>

          {/* Card Name Short */}
          <div className="text-center">
            <div className="text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider drop-shadow-md">
              {card.nameShort}
            </div>

            {/* Arcana/Suit Badge */}
            <div className="mt-3 inline-block">
              <div className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                {card.arcana === 'major' ? 'Major Arcana' :
                 card.suit ? card.suit.toUpperCase() : 'Minor Arcana'}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30" />
        </div>

        {/* Reversed Indicator */}
        {isReversed && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
            역방향
          </div>
        )}
      </div>
    );
  }

  // 실제 이미지 표시
  return (
    <div className={`aspect-[2/3] relative overflow-hidden rounded-lg ${rotate} ${className}`}>
      <Image
        src={imageUrl}
        alt={card.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => setImageError(true)}
        priority={false}
      />

      {/* Reversed Indicator */}
      {isReversed && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
          역방향
        </div>
      )}
    </div>
  );
}
