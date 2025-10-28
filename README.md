# Unwoldam Tarot - AI 타로 리딩 웹 애플리케이션

Next.js 기반의 AI 타로 리딩 서비스 프론트엔드 애플리케이션입니다.

## 🎯 주요 기능

- **78장 타로 카드 목록** - 메이저/마이너 아르카나 전체 카드 탐색
- **카드 상세 정보** - 정방향/역방향 의미와 키워드
- **AI 타로 리딩** - Claude AI를 활용한 카드 해석
- **회원가입/로그인** - JWT 기반 인증 시스템
- **내 리딩 목록** - 개인 리딩 기록 관리
- **공개 리딩 피드** - 소셜 기능 (좋아요, 댓글)
- **대시보드** - 통계 및 분석
- **내보내기** - PDF, CSV, JSON 형식 지원

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Authentication**: JWT (localStorage)

## 📋 사전 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일이 이미 설정되어 있습니다:

```env
NEXT_PUBLIC_API_URL=https://tarot-production-ed3e.up.railway.app/api/v1
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 프로덕션 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
unwoldamstudio/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # 인증 관련 페이지
│   │   ├── login/
│   │   └── register/
│   ├── cards/                   # 카드 목록 & 상세
│   │   └── [id]/
│   ├── readings/                # 리딩 관련 페이지
│   │   ├── [id]/               # 리딩 상세
│   │   ├── new/                # 새 리딩 생성
│   │   └── page.tsx            # 내 리딩 목록
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 홈페이지
│   └── globals.css              # 글로벌 스타일
├── components/
│   ├── ui/                      # shadcn/ui 컴포넌트
│   ├── layout/                  # 레이아웃 컴포넌트
│   ├── cards/                   # 카드 컴포넌트
│   └── readings/                # 리딩 컴포넌트
├── lib/
│   ├── api/                     # API 클라이언트 & 엔드포인트
│   ├── auth/                    # 인증 유틸리티
│   ├── types/                   # TypeScript 타입 정의
│   └── utils.ts                 # 유틸리티 함수
├── contexts/                    # React 컨텍스트
└── hooks/                       # 커스텀 훅
```

## 🔑 테스트 계정

개발 및 테스트를 위한 계정:

- **이메일**: test@unwoldam.com
- **비밀번호**: password123

## 🌐 API 엔드포인트

백엔드 API URL: `https://tarot-production-ed3e.up.railway.app/api/v1`

주요 엔드포인트:
- `GET /cards` - 카드 목록 조회
- `GET /cards/:id` - 카드 상세 정보
- `POST /auth/login` - 로그인
- `POST /auth/register` - 회원가입
- `GET /auth/me` - 사용자 정보 조회
- `POST /readings` - 리딩 생성
- `GET /readings` - 내 리딩 목록
- `GET /readings/public` - 공개 리딩 피드

자세한 API 문서는 [FRONTEND_API_REFERENCE.md](https://github.com/psh10004okpro/Tarot/blob/main/FRONTEND_API_REFERENCE.md)를 참고하세요.

## 🎨 주요 페이지

### 홈페이지 (/)
- 서비스 소개
- 주요 기능 안내
- 시작하기 버튼

### 카드 목록 (/cards)
- 78장 타로 카드 그리드
- 필터링 (메이저/마이너 아르카나, 수트별)
- 검색 기능

### 카드 상세 (/cards/[id])
- 카드 이미지 및 설명
- 정방향/역방향 의미
- 키워드 표시

### 로그인 (/login)
- 이메일/비밀번호 입력
- JWT 토큰 기반 인증

### 회원가입 (/register)
- 사용자명, 이메일, 비밀번호 입력
- 계정 생성 및 자동 로그인

### 내 리딩 목록 (/readings)
- 전체 리딩 기록 조회
- 카테고리별 필터링 (연애, 커리어, 건강, 일반)
- 스프레드 타입별 필터링 (원 카드, 쓰리 카드, 켈틱 크로스)
- 즐겨찾기 필터
- 리딩 삭제 및 즐겨찾기 토글

### 새 리딩 생성 (/readings/new)
- 3단계 위저드 인터페이스
- 질문 입력 및 카테고리 선택
- 스프레드 타입 선택
- 랜덤 카드 뽑기
- AI 해석 요청

### 리딩 상세 (/readings/[id])
- 뽑은 카드 표시
- AI 해석 전문
- 즐겨찾기 토글
- 공개/비공개 설정
- 좋아요 및 댓글 수 표시

## 🔐 인증 시스템

- JWT Bearer Token 방식
- localStorage에 토큰 저장
- 401 응답 시 자동 로그아웃 처리
- Authorization 헤더 자동 추가

## ✅ 구현 완료

- [x] 홈페이지
- [x] 로그인/회원가입
- [x] 카드 목록 및 상세 페이지
- [x] 내 리딩 목록 페이지 (필터링 포함)
- [x] 리딩 생성 페이지 (카드 뽑기)
- [x] 리딩 상세 페이지
- [x] 즐겨찾기 기능
- [x] 공개/비공개 설정

## 🎯 다음 단계

아직 구현되지 않은 기능들:

- [ ] 공개 리딩 피드 페이지 (/feed)
- [ ] 대시보드 페이지 (/dashboard)
- [ ] 댓글 기능 (CRUD)
- [ ] 좋아요 기능
- [ ] 내보내기 기능 (PDF, CSV, JSON)
- [ ] 타로 카드 실제 이미지 추가 (현재는 그라데이션)

## 🖼️ 타로 카드 이미지 추가

현재는 카드를 텍스트와 그라데이션으로 표시합니다. 실제 타로 카드 이미지를 추가하려면:

1. **[CARD_IMAGES_GUIDE.md](./CARD_IMAGES_GUIDE.md)** 문서 참고
2. `public/cards/` 폴더에 78장의 이미지 파일 배치
3. 파일명: `{nameShort}.jpg` (예: `ar01.jpg`, `cu05.jpg`)
4. 권장 크기: 600x900px (2:3 비율)

무료 타로 카드 이미지는 Rider-Waite Tarot (Public Domain)을 권장합니다.

## 📝 개발 스크립트

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 실행
```

## 🤝 기여

이 프로젝트는 Unwoldam Studio에서 개발되었습니다.

## 📄 라이센스

© 2024 Unwoldam Tarot. All rights reserved.

---

**제작**: Claude Code
**백엔드 저장소**: [psh10004okpro/Tarot](https://github.com/psh10004okpro/Tarot)
