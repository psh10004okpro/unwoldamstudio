'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export function KakaoProvider() {
  useEffect(() => {
    // Kakao SDK 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.integrity = 'sha384-TiCUE00h+dvQ5RnfT5+nE8D9VvJH5EqNiZR/XSqKC4CIhX7FO0i3ySqaWRIQpZKD';
    script.crossOrigin = 'anonymous';
    script.async = true;

    script.onload = () => {
      // Kakao SDK 초기화
      if (window.Kakao && !window.Kakao.isInitialized()) {
        const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

        if (appKey) {
          window.Kakao.init(appKey);
          console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
        } else {
          console.warn(
            'Kakao App Key가 설정되지 않았습니다.\n' +
            'NEXT_PUBLIC_KAKAO_APP_KEY 환경변수를 설정해주세요.\n' +
            'https://developers.kakao.com 에서 앱을 생성하고 JavaScript 키를 발급받으세요.'
          );
        }
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
}
