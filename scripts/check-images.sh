#!/bin/bash

# 타로 카드 이미지 파일 확인 스크립트
# public/cards/ 폴더에 78장이 모두 있는지 확인

CARDS_DIR="public/cards"

echo "=== 타로 카드 이미지 파일 체크 ==="
echo ""

# 디렉토리 존재 확인
if [ ! -d "$CARDS_DIR" ]; then
    echo "❌ $CARDS_DIR 폴더가 없습니다."
    echo "   mkdir -p $CARDS_DIR 로 폴더를 생성하세요."
    exit 1
fi

# 총 개수 확인
TOTAL=$(ls $CARDS_DIR/*.jpg 2>/dev/null | wc -l)
echo "📊 현재 이미지 개수: $TOTAL / 78"
echo ""

if [ $TOTAL -eq 78 ]; then
    echo "✅ 모든 카드 이미지가 준비되었습니다!"
elif [ $TOTAL -eq 0 ]; then
    echo "⚠️  이미지가 하나도 없습니다."
    echo "   UPLOAD_IMAGES_GUIDE.md를 참고하여 이미지를 추가하세요."
else
    echo "⚠️  $((78 - TOTAL))장의 카드가 누락되었습니다."
    echo ""
    echo "누락된 카드를 확인하고 있습니다..."
    echo ""

    # 필요한 파일 목록
    REQUIRED_FILES=(
        "ar00" "ar01" "ar02" "ar03" "ar04" "ar05" "ar06" "ar07" "ar08" "ar09"
        "ar10" "ar11" "ar12" "ar13" "ar14" "ar15" "ar16" "ar17" "ar18" "ar19"
        "ar20" "ar21"
        "cuac" "cu02" "cu03" "cu04" "cu05" "cu06" "cu07" "cu08" "cu09" "cu10"
        "cupa" "cukn" "cuqu" "cuki"
        "waac" "wa02" "wa03" "wa04" "wa05" "wa06" "wa07" "wa08" "wa09" "wa10"
        "wapa" "wakn" "waqu" "waki"
        "swac" "sw02" "sw03" "sw04" "sw05" "sw06" "sw07" "sw08" "sw09" "sw10"
        "swpa" "swkn" "swqu" "swki"
        "peac" "pe02" "pe03" "pe04" "pe05" "pe06" "pe07" "pe08" "pe09" "pe10"
        "pepa" "pekn" "pequ" "peki"
    )

    MISSING_COUNT=0
    for file in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "$CARDS_DIR/$file.jpg" ]; then
            echo "❌ 누락: $file.jpg"
            MISSING_COUNT=$((MISSING_COUNT + 1))
        fi
    done

    echo ""
    echo "총 $MISSING_COUNT 장의 카드가 누락되었습니다."
fi

echo ""
echo "=== 파일 크기 확인 ==="
if [ $TOTAL -gt 0 ]; then
    TOTAL_SIZE=$(du -sh $CARDS_DIR | cut -f1)
    AVG_SIZE=$(du -sk $CARDS_DIR/*.jpg 2>/dev/null | awk '{sum+=$1} END {print int(sum/NR)}')
    echo "📦 전체 크기: $TOTAL_SIZE"
    echo "📄 평균 파일 크기: ${AVG_SIZE}KB"
fi

echo ""
echo "=== 완료 ==="
