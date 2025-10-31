'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquarePlus } from 'lucide-react';

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content);
      setContent('');
    } catch (error) {
      // Error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="댓글을 입력하세요..."
              rows={3}
              disabled={isSubmitting}
              className="resize-none"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="gap-2"
            >
              <MessageSquarePlus className="h-4 w-4" />
              {isSubmitting ? '작성 중...' : '댓글 작성'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
