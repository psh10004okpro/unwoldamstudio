'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileText, Image, Printer, Loader2 } from 'lucide-react';
import { Reading } from '@/lib/types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  reading: Reading;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function ExportButton({ reading, variant = 'outline', size = 'sm' }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const spreadTypeLabels: Record<string, string> = {
    'one-card': '원 카드',
    'three-card': '쓰리 카드',
    'celtic-cross': '켈틱 크로스',
  };

  const categoryLabels: Record<string, string> = {
    'love': '연애',
    'career': '커리어',
    'health': '건강',
    'general': '일반',
  };

  // 이미지를 Base64로 로드하는 헬퍼 함수
  const loadImageAsBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        } else {
          reject(new Error('Canvas context error'));
        }
      };
      img.onerror = () => reject(new Error('Image load error'));
      img.src = url;
    });
  };

  // PDF 내보내기
  const handleExportPDF = async () => {
    try {
      setExporting(true);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // 제목
      pdf.setFontSize(20);
      pdf.text('Unwoldam Tarot', margin, yPosition);
      yPosition += 10;

      // 구분선
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      // 질문
      pdf.setFontSize(16);
      pdf.text('질문', margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(12);
      const questionLines = pdf.splitTextToSize(reading.question, pageWidth - 2 * margin);
      pdf.text(questionLines, margin, yPosition);
      yPosition += questionLines.length * 7 + 5;

      // 리딩 정보
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(
        `${spreadTypeLabels[reading.spreadType]} | ${categoryLabels[reading.category]} | ${new Date(reading.createdAt).toLocaleDateString('ko-KR')}`,
        margin,
        yPosition
      );
      yPosition += 10;
      pdf.setTextColor(0);

      // 뽑은 카드 (이미지 포함)
      pdf.setFontSize(14);
      pdf.text('뽑은 카드', margin, yPosition);
      yPosition += 10;

      // 카드 이미지 로드 및 배치
      const cardImageWidth = 25; // mm
      const cardImageHeight = 42; // mm (2:3 비율)
      const cardSpacing = 5; // mm
      const cardsPerRow = Math.min(5, reading.cards.length);

      // 카드 배치 전 공간 확인
      const totalRows = Math.ceil(reading.cards.length / cardsPerRow);
      const cardsBlockHeight = totalRows * (cardImageHeight + 15);

      if (yPosition + cardsBlockHeight > pageHeight - margin - 20) {
        pdf.addPage();
        yPosition = margin;
      }

      for (let i = 0; i < reading.cards.length; i++) {
        const cardData = reading.cards[i];
        const row = Math.floor(i / cardsPerRow);
        const col = i % cardsPerRow;

        const xPosition = margin + col * (cardImageWidth + cardSpacing);
        const cardYPosition = yPosition + row * (cardImageHeight + 15);

        try {
          // 카드 이미지 로드
          const imageUrl = `/cards/webp/${cardData.card.nameShort.toLowerCase()}-thumb.webp`;
          const imageData = await loadImageAsBase64(imageUrl);

          // PDF에 이미지 추가
          pdf.addImage(imageData, 'JPEG', xPosition, cardYPosition, cardImageWidth, cardImageHeight);

          // 역방향일 경우 "R" 배지 추가
          if (cardData.isReversed) {
            pdf.setFillColor(220, 53, 69); // red
            pdf.circle(xPosition + cardImageWidth - 4, cardYPosition + 4, 3, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(6);
            pdf.text('R', xPosition + cardImageWidth - 4, cardYPosition + 5, { align: 'center' });
            pdf.setTextColor(0);
          }
        } catch (error) {
          console.error('Failed to load card image:', error);
          // 이미지 로드 실패 시 사각형으로 대체
          pdf.setDrawColor(200);
          pdf.rect(xPosition, cardYPosition, cardImageWidth, cardImageHeight);
        }

        // 카드 이름
        pdf.setFontSize(7);
        const cardName = cardData.card.name.length > 12 ? cardData.card.name.substring(0, 12) + '...' : cardData.card.name;
        const cardLabel = `${cardName}${cardData.isReversed ? ' (R)' : ''}`;
        pdf.text(cardLabel, xPosition + cardImageWidth / 2, cardYPosition + cardImageHeight + 4, { align: 'center' });
      }

      // 다음 섹션 시작 위치 계산
      yPosition += cardsBlockHeight + 10;

      // AI 해석
      pdf.setFontSize(14);
      pdf.text('AI 해석', margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(10);
      const interpretationLines = pdf.splitTextToSize(
        reading.interpretation,
        pageWidth - 2 * margin
      );

      // 페이지 넘김 처리
      interpretationLines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });

      // Footer
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150);
        pdf.text(
          'Generated by Unwoldam Tarot - https://unwoldamstudio.vercel.app',
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
        pdf.text(`${i} / ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      }

      // 파일명 생성
      const fileName = `타로리딩_${reading.question.substring(0, 20)}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('PDF 내보내기 중 오류가 발생했습니다.');
    } finally {
      setExporting(false);
    }
  };

  // PNG 이미지로 내보내기
  const handleExportImage = async () => {
    try {
      setExporting(true);

      // 리딩 상세 페이지의 메인 콘텐츠 캡처
      const element = document.querySelector('main') as HTMLElement;
      if (!element) {
        alert('콘텐츠를 찾을 수 없습니다.');
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Canvas를 Blob으로 변환
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `타로리딩_${reading.question.substring(0, 20)}_${new Date().toISOString().split('T')[0]}.png`;
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Image export error:', error);
      alert('이미지 내보내기 중 오류가 발생했습니다.');
    } finally {
      setExporting(false);
    }
  };

  // 인쇄
  const handlePrint = () => {
    window.print();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} disabled={exporting}>
          {exporting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              내보내는 중...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              내보내기
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPDF}>
          <FileText className="h-4 w-4 mr-2" />
          PDF로 저장
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportImage}>
          <Image className="h-4 w-4 mr-2" />
          이미지로 저장
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          인쇄
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
