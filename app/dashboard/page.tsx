'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userApi } from '@/lib/api/endpoints';
import { DashboardStats } from '@/lib/types';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Heart,
  BookOpen,
  Globe,
  TrendingUp,
  Sparkles,
  Eye,
} from 'lucide-react';

const COLORS = {
  love: '#ef4444',
  career: '#3b82f6',
  health: '#10b981',
  general: '#8b5cf6',
};

const SPREAD_COLORS = {
  'one-card': '#f59e0b',
  'three-card': '#06b6d4',
  'celtic-cross': '#ec4899',
};

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await userApi.getDashboard();
      setStats(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.message || '대시보드를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-destructive">{error || '데이터를 불러올 수 없습니다.'}</p>
          <Button onClick={fetchDashboard} className="mt-4">
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const categoryData = Object.entries(stats.readingsByCategory).map(([key, value]) => ({
    name: key === 'love' ? '연애' : key === 'career' ? '커리어' : key === 'health' ? '건강' : '일반',
    value,
    color: COLORS[key as keyof typeof COLORS],
  }));

  const spreadData = Object.entries(stats.readingsBySpreadType).map(([key, value]) => ({
    name: key === 'one-card' ? '원 카드' : key === 'three-card' ? '쓰리 카드' : '켈틱 크로스',
    count: value,
    color: SPREAD_COLORS[key as keyof typeof SPREAD_COLORS],
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">대시보드</h1>
        <p className="text-muted-foreground">
          나의 타로 리딩 통계와 활동을 한눈에 확인하세요
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 리딩</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReadings}</div>
            <p className="text-xs text-muted-foreground">
              전체 리딩 개수
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">즐겨찾기</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favoriteReadings}</div>
            <p className="text-xs text-muted-foreground">
              즐겨찾기한 리딩
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">공개 리딩</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publicReadings}</div>
            <p className="text-xs text-muted-foreground">
              커뮤니티에 공개된 리딩
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">받은 좋아요</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLikesReceived}</div>
            <p className="text-xs text-muted-foreground">
              다른 사용자의 좋아요
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>카테고리별 리딩 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spread Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>스프레드 타입별 리딩</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spreadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8">
                  {spreadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trending Cards */}
      {stats.trendingCards.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              자주 나오는 카드
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.trendingCards.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{item.card.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.card.arcana === 'major' ? '메이저 아르카나' : '마이너 아르카나'}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.count}번 출현
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Readings */}
      {stats.recentReadings.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                최근 리딩
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/readings">전체 보기</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentReadings.slice(0, 5).map((reading) => (
                <Link
                  key={reading.id}
                  href={`/readings/${reading.id}`}
                  className="block p-3 rounded-lg border hover:bg-muted transition-colors"
                >
                  <p className="font-medium mb-1">{reading.question}</p>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {reading.spreadType === 'one-card' ? '원 카드' :
                       reading.spreadType === 'three-card' ? '쓰리 카드' : '켈틱 크로스'}
                    </span>
                    <span>{reading.cards.length}장의 카드</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {stats.totalReadings === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">아직 리딩이 없습니다</h3>
            <p className="text-muted-foreground mb-6">
              첫 타로 리딩을 시작해보세요
            </p>
            <Button asChild>
              <Link href="/readings/new">새 리딩 만들기</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
