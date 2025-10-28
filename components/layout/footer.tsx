import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Unwoldam Tarot</h3>
            <p className="text-sm text-muted-foreground">
              AI 기반 타로 리딩 서비스로 당신의 질문에 대한 통찰을 제공합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">링크</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/cards" className="hover:text-primary transition-colors">
                  카드 목록
                </Link>
              </li>
              <li>
                <Link href="/readings" className="hover:text-primary transition-colors">
                  내 리딩
                </Link>
              </li>
              <li>
                <Link href="/feed" className="hover:text-primary transition-colors">
                  커뮤니티
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">정보</h3>
            <p className="text-sm text-muted-foreground">
              © 2024 Unwoldam Tarot. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
