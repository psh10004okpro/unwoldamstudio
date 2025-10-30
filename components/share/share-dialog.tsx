'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Share2,
  Link as LinkIcon,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  Check,
} from 'lucide-react';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title: string;
  description?: string;
}

export function ShareDialog({
  open,
  onOpenChange,
  url,
  title,
  description = ''
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleShareTwitter = () => {
    const text = `${title}\n\n${description}`;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleShareKakao = () => {
    // 카카오톡 공유는 Kakao SDK가 필요합니다
    // 여기서는 URL을 복사하고 사용자가 직접 공유하도록 안내
    if (typeof window !== 'undefined' && (window as any).Kakao) {
      (window as any).Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: 'https://unwoldamstudio.vercel.app/og-image.png',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      });
    } else {
      // Kakao SDK가 없으면 URL 복사
      handleCopyLink();
      alert('링크가 복사되었습니다. 카카오톡에서 직접 공유해주세요.');
    }
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            공유하기
          </DialogTitle>
          <DialogDescription>
            타로 리딩을 친구들과 공유해보세요
          </DialogDescription>
        </DialogHeader>

        {/* 링크 복사 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={url}
              readOnly
              className="flex-1"
            />
            <Button
              size="sm"
              variant={copied ? 'default' : 'outline'}
              onClick={handleCopyLink}
              className="shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  복사됨
                </>
              ) : (
                <>
                  <LinkIcon className="h-4 w-4 mr-1" />
                  복사
                </>
              )}
            </Button>
          </div>

          {/* 소셜 미디어 버튼 */}
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-3">소셜 미디어로 공유</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleShareFacebook}
                className="w-full"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={handleShareTwitter}
                className="w-full"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={handleShareKakao}
                className="w-full"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                KakaoTalk
              </Button>
              <Button
                variant="outline"
                onClick={handleShareEmail}
                className="w-full"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          {/* Web Share API (모바일) */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <Button
              variant="default"
              onClick={() => {
                navigator.share({
                  title,
                  text: description,
                  url,
                }).catch((err) => console.log('Share cancelled', err));
              }}
              className="w-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              더 많은 방법으로 공유
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 공유 버튼 컴포넌트
interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function ShareButton({
  url,
  title,
  description,
  variant = 'outline',
  size = 'default'
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setOpen(true)}
      >
        <Share2 className="h-4 w-4 mr-2" />
        공유
      </Button>
      <ShareDialog
        open={open}
        onOpenChange={setOpen}
        url={url}
        title={title}
        description={description}
      />
    </>
  );
}
