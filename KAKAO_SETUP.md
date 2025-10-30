# 카카오톡 공유 기능 설정 가이드

이 가이드는 Unwoldam Tarot 웹사이트에서 카카오톡 공유 기능을 활성화하는 방법을 설명합니다.

## 🔧 설정 단계

### 1. Kakao Developers 앱 생성

1. [Kakao Developers](https://developers.kakao.com)에 접속하여 로그인합니다
2. 우측 상단 **"내 애플리케이션"** 클릭
3. **"애플리케이션 추가하기"** 클릭
4. 앱 이름 입력 (예: "Unwoldam Tarot") 후 저장

### 2. JavaScript 키 복사

1. 생성된 앱을 선택
2. **"앱 설정" > "요약 정보"** 메뉴로 이동
3. **"JavaScript 키"** 복사 (예: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### 3. 플랫폼 등록

1. **"앱 설정" > "플랫폼"** 메뉴로 이동
2. **"Web 플랫폼 등록"** 클릭
3. 사이트 도메인 등록:
   - 개발 환경: `http://localhost:3000`
   - 프로덕션: `https://unwoldamstudio.vercel.app`
4. **"저장"** 클릭

### 4. 환경 변수 설정

#### 로컬 개발 환경

1. 프로젝트 루트 디렉토리에서 `.env.local` 파일 생성:
   ```bash
   cp .env.local.example .env.local
   ```

2. `.env.local` 파일을 열고 JavaScript 키 입력:
   ```env
   NEXT_PUBLIC_KAKAO_APP_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```

3. 개발 서버 재시작:
   ```bash
   npm run dev
   ```

4. 브라우저 콘솔에서 확인:
   ```
   Kakao SDK initialized: true
   ```

#### Vercel 프로덕션 환경

1. [Vercel Dashboard](https://vercel.com/dashboard)에 접속
2. 프로젝트 선택 > **"Settings"** > **"Environment Variables"**
3. 새 환경 변수 추가:
   - **Key**: `NEXT_PUBLIC_KAKAO_APP_KEY`
   - **Value**: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` (2단계에서 복사한 키)
   - **Environments**: Production, Preview, Development 모두 선택
4. **"Save"** 클릭
5. 프로젝트 재배포 (자동 또는 수동)

## ✅ 테스트

### 개발 환경 테스트

1. `http://localhost:3000/readings/[id]` 페이지 접속
2. **"공유"** 버튼 클릭
3. **"KakaoTalk"** 버튼 클릭
4. 카카오톡 공유 팝업이 표시되는지 확인

### 프로덕션 테스트

1. `https://unwoldamstudio.vercel.app/readings/[id]` 페이지 접속
2. 모바일 또는 카카오톡이 설치된 환경에서 테스트
3. **"공유" > "KakaoTalk"** 클릭
4. 카카오톡 앱으로 공유되는지 확인

## 🔍 문제 해결

### SDK 초기화 실패

**증상**: 콘솔에 경고 메시지 표시
```
Kakao App Key가 설정되지 않았습니다.
```

**해결 방법**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 환경 변수 이름이 정확한지 확인: `NEXT_PUBLIC_KAKAO_APP_KEY`
3. 개발 서버 재시작: `npm run dev`

### 카카오톡 공유 버튼 클릭 시 URL 복사만 됨

**증상**: 카카오톡 공유 팝업이 뜨지 않고 URL만 복사됨

**원인**: Kakao SDK가 로드되지 않음

**해결 방법**:
1. 브라우저 콘솔 확인 (`F12`)
2. `window.Kakao`가 존재하는지 확인: `console.log(window.Kakao)`
3. SDK 초기화 상태 확인: `console.log(window.Kakao.isInitialized())`
4. 네트워크 탭에서 `kakao_js_sdk` 스크립트 로딩 확인

### Vercel 배포 후 작동하지 않음

**원인**: 플랫폼 도메인 미등록 또는 환경 변수 미설정

**해결 방법**:
1. Kakao Developers에서 Vercel 도메인 등록 확인
2. Vercel 환경 변수 설정 확인
3. Vercel 프로젝트 재배포

## 📝 참고 자료

- [Kakao Developers 공식 문서](https://developers.kakao.com/docs/latest/ko/message/js)
- [JavaScript SDK 가이드](https://developers.kakao.com/docs/latest/ko/javascript/getting-started)
- [카카오톡 공유 API](https://developers.kakao.com/docs/latest/ko/message/js-link)

## 📂 관련 파일

- `components/providers/kakao-provider.tsx` - Kakao SDK 로더 및 초기화
- `components/share/share-dialog.tsx` - 공유 다이얼로그 (카카오톡 공유 포함)
- `app/layout.tsx` - KakaoProvider 통합
- `.env.local.example` - 환경 변수 예제 파일
- `.env.local` - 실제 환경 변수 (Git에서 제외됨)

## 🎯 구현 완료 사항

- ✅ Kakao SDK 자동 로드 및 초기화
- ✅ 환경 변수 기반 설정
- ✅ 공유 다이얼로그 통합
- ✅ 로컬/프로덕션 환경 모두 지원
- ✅ SDK 없을 경우 URL 복사로 자동 폴백
- ✅ 개발자 친화적 콘솔 로깅

---

**중요**: `.env.local` 파일은 절대 Git에 커밋하지 마세요. 이미 `.gitignore`에 추가되어 있습니다.
