'use client';

import { useEffect, useState } from 'react';
import { Comment } from '@/lib/types';
import { commentsApi } from '@/lib/api/endpoints';
import { CommentForm } from './comment-form';
import { CommentItem } from './comment-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface CommentsSectionProps {
  readingId: string;
  initialCount?: number;
}

export function CommentsSection({ readingId, initialCount = 0 }: CommentsSectionProps) {
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readingId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentsApi.getByReading(readingId);
      setComments(response.data.data);
      setError('');
    } catch (err: any) {
      setError(err.message || '댓글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (content: string) => {
    try {
      const response = await commentsApi.create(readingId, { content });
      setComments([response.data.data, ...comments]);
    } catch (err: any) {
      alert(err.message || '댓글 작성에 실패했습니다.');
      throw err;
    }
  };

  const handleEditComment = async (id: string, content: string) => {
    try {
      const response = await commentsApi.update(id, { content });
      setComments(comments.map(c => c.id === id ? response.data.data : c));
    } catch (err: any) {
      alert(err.message || '댓글 수정에 실패했습니다.');
      throw err;
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      await commentsApi.delete(id);
      setComments(comments.filter(c => c.id !== id));
    } catch (err: any) {
      alert(err.message || '댓글 삭제에 실패했습니다.');
      throw err;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          댓글 {comments.length}개
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAuthenticated && (
          <CommentForm onSubmit={handleCreateComment} />
        )}

        {loading ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            댓글을 불러오는 중...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-sm text-destructive">
            {error}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
