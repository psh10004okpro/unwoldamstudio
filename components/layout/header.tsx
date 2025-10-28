'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  Menu
} from 'lucide-react';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <span className="text-xl font-bold">Unwoldam Tarot</span>
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/cards"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  카드 목록
                </div>
              </Link>
              <Link
                href="/readings"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  내 리딩
                </div>
              </Link>
              <Link
                href="/feed"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  커뮤니티
                </div>
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  대시보드
                </div>
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden md:inline-block text-sm text-muted-foreground">
                {user?.username}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">로그인</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">회원가입</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
