'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Sparkles, BookOpen, Users, TrendingUp, Heart } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <Sparkles className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Unwoldam Tarot
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          AI가 해석하는 타로 리딩으로 당신의 질문에 대한 깊은 통찰을 얻어보세요.
          <br />
          78장의 타로 카드가 당신을 기다립니다.
        </p>
        {!isAuthenticated && (
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">시작하기</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">로그인</Link>
            </Button>
          </div>
        )}
        {isAuthenticated && (
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/cards">카드 보기</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/readings">내 리딩 보기</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>78장의 타로 카드</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              메이저 아르카나 22장과 마이너 아르카나 56장의 전통적인 타로 카드를 모두 제공합니다.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Sparkles className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>AI 리딩</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Claude AI가 카드의 의미를 분석하고 당신의 질문에 맞는 통찰력 있는 해석을 제공합니다.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>커뮤니티</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              다른 사용자들의 공개 리딩을 보고 댓글과 좋아요로 소통할 수 있습니다.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>통계 & 내보내기</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              나의 리딩 기록을 분석하고 PDF, CSV, JSON 형식으로 내보낼 수 있습니다.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* How It Works Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8">어떻게 작동하나요?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">질문하기</h3>
            <p className="text-muted-foreground">
              궁금한 것을 질문하고 스프레드 타입을 선택하세요
            </p>
          </div>
          <div>
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">카드 뽑기</h3>
            <p className="text-muted-foreground">
              선택한 스프레드에 따라 타로 카드를 뽑습니다
            </p>
          </div>
          <div>
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">AI 해석</h3>
            <p className="text-muted-foreground">
              AI가 카드를 분석하고 통찰력 있는 해석을 제공합니다
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="text-center bg-muted rounded-lg p-12">
          <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">
            지금 시작해보세요
          </h2>
          <p className="text-muted-foreground mb-6">
            무료로 가입하고 AI 타로 리딩을 경험해보세요
          </p>
          <Button size="lg" asChild>
            <Link href="/register">무료로 시작하기</Link>
          </Button>
        </section>
      )}
    </div>
  );
}
