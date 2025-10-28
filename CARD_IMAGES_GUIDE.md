# 타로 카드 이미지 추가 가이드

현재 프로젝트는 타로 카드를 **텍스트와 그라데이션 배경**으로 표시하고 있습니다. 실제 타로 카드 이미지를 추가하려면 다음 과정을 따르세요.

## 📁 1. 이미지 파일 준비

### 필요한 이미지
- **78장의 타로 카드** 이미지 파일 (JPG 또는 PNG)
- 권장 크기: 600x900px 이상 (2:3 비율)
- 파일명 규칙: `{nameShort}.jpg` (소문자)

### 파일명 예시
```
ar01.jpg  (The Fool)
ar02.jpg  (The Magician)
ar03.jpg  (The High Priestess)
...
cu01.jpg  (Ace of Cups)
cu02.jpg  (Two of Cups)
...
wa01.jpg  (Ace of Wands)
sw01.jpg  (Ace of Swords)
pe01.jpg  (Ace of Pentacles)
```

## 🎨 2. 이미지 소스 찾기

### 무료 타로 카드 이미지 소스

1. **Rider-Waite Tarot (Public Domain)**
   - https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck
   - 가장 유명한 타로 덱, 저작권 만료

2. **Sacred Texts Archive**
   - https://www.sacred-texts.com/tarot/
   - 다양한 클래식 타로 이미지

3. **Open Tarot**
   - GitHub에서 "tarot cards images" 검색
   - 오픈소스 타로 이미지 프로젝트

4. **Unsplash / Pexels**
   - 타로 카드 검색 (제한적)

### 주의사항
- 상업적 사용 가능 여부 확인
- 라이센스 조건 준수
- Public Domain 이미지 우선 사용 권장

## 📂 3. 이미지 파일 배치

### 파일 구조
```
unwoldamstudio/
└── public/
    └── cards/
        ├── ar01.jpg  (Major Arcana)
        ├── ar02.jpg
        ├── ...
        ├── cu01.jpg  (Cups)
        ├── cu02.jpg
        ├── ...
        ├── wa01.jpg  (Wands)
        ├── sw01.jpg  (Swords)
        └── pe01.jpg  (Pentacles)
```

### 배치 방법
1. `public/cards/` 폴더에 이미지 파일 복사
2. 파일명이 백엔드 API의 `nameShort` 값과 일치하는지 확인
3. 모든 파일명을 **소문자**로 변경

```bash
# 예시: 이미지 파일 복사
cp /path/to/tarot-images/*.jpg public/cards/
```

## 🖼️ 4. 컴포넌트에서 이미지 사용

### 현재 코드 (그라데이션)
```tsx
<div className="aspect-[2/3] bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center">
  <div className="text-center p-6">
    <div className="text-4xl mb-2">{card.value}</div>
    <div className="text-sm font-medium">{card.nameShort}</div>
  </div>
</div>
```

### 이미지 사용 코드
```tsx
import Image from 'next/image';

<div className="aspect-[2/3] relative overflow-hidden bg-muted">
  <Image
    src={`/cards/${card.nameShort.toLowerCase()}.jpg`}
    alt={card.name}
    fill
    className="object-cover"
    onError={(e) => {
      // 이미지 로드 실패 시 fallback
      e.currentTarget.style.display = 'none';
    }}
  />
</div>
```

## 🔧 5. 자동화된 이미지 컴포넌트 생성

`components/cards/card-image.tsx` 파일 생성:

```tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CardImageProps {
  nameShort: string;
  name: string;
  value: string;
  isReversed?: boolean;
}

export function CardImage({ nameShort, name, value, isReversed = false }: CardImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback: 그라데이션 배경 표시
    return (
      <div className={`aspect-[2/3] bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center p-4 ${isReversed ? 'rotate-180' : ''}`}>
        <div className="text-center">
          <div className="text-4xl mb-2">{value}</div>
          <div className="text-xs font-medium">{nameShort}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`aspect-[2/3] relative overflow-hidden bg-muted ${isReversed ? 'rotate-180' : ''}`}>
      <Image
        src={`/cards/${nameShort.toLowerCase()}.jpg`}
        alt={name}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
```

## 📝 6. 기존 컴포넌트 업데이트

### TarotCard 컴포넌트 업데이트
`components/cards/tarot-card.tsx`:

```tsx
import { CardImage } from '@/components/cards/card-image';

// CardHeader 내부 교체:
<CardHeader className="p-0">
  <CardImage
    nameShort={card.nameShort}
    name={card.name}
    value={card.value}
  />
</CardHeader>
```

## ✅ 7. 확인 사항

- [ ] 78장 모든 카드 이미지 준비
- [ ] `public/cards/` 폴더에 배치
- [ ] 파일명 형식 확인 (소문자 `.jpg`)
- [ ] CardImage 컴포넌트 생성
- [ ] 기존 컴포넌트에 적용
- [ ] 이미지 로드 테스트
- [ ] Fallback 작동 확인

## 🎯 대안: 백엔드에서 이미지 URL 제공

백엔드 API가 `imageUrl` 필드를 제공하는 경우:

```tsx
<div className="aspect-[2/3] relative">
  <Image
    src={card.imageUrl || `/cards/${card.nameShort.toLowerCase()}.jpg`}
    alt={card.name}
    fill
    className="object-cover"
  />
</div>
```

## 📦 이미지 최적화

### Next.js 이미지 최적화 설정
`next.config.ts`:

```typescript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
},
```

---

**참고**: 현재는 이미지 없이도 앱이 정상 작동합니다. 이미지는 선택사항이며, 추가 시 사용자 경험이 향상됩니다.
