import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TarotCard as TarotCardType } from '@/lib/types';
import { CardImage } from '@/components/cards/card-image';
import Link from 'next/link';

interface TarotCardProps {
  card: TarotCardType;
}

export function TarotCard({ card }: TarotCardProps) {
  return (
    <Link href={`/cards/${card.nameShort}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader className="p-0">
          <CardImage card={card} size="thumb" />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg mb-2">{card.name}</CardTitle>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {card.arcana === 'major' ? '메이저' : '마이너'}
            </span>
            {card.suit && (
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {card.suit}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
          <p className="line-clamp-2">{card.description}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
