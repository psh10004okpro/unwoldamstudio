#!/bin/bash

# 타로 카드 한글 파일명 → 영문 파일명 자동 변환 스크립트
# 사용법: bash scripts/rename-korean-to-english.sh

SOURCE_DIR="public/cards"
BACKUP_DIR="public/cards/backup_$(date +%Y%m%d_%H%M%S)"

echo "=== 타로 카드 한글 파일명 → 영문 파일명 변환 ==="
echo ""

# 백업 디렉토리 생성
if ls $SOURCE_DIR/*.{jpg,jpeg,png,JPG,JPEG,PNG} 1> /dev/null 2>&1; then
    echo "📦 백업 생성 중: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
    cp $SOURCE_DIR/*.{jpg,jpeg,png,JPG,JPEG,PNG} "$BACKUP_DIR/" 2>/dev/null
    echo "✅ 원본 파일 백업 완료"
    echo ""
fi

# 변환 카운터
CONVERTED=0
SKIPPED=0

# Major Arcana (메이저 아르카나) - 22장
declare -A MAJOR_ARCANA=(
    ["바보"]="ar00"
    ["광대"]="ar00"
    ["마법사"]="ar01"
    ["마술사"]="ar01"
    ["여사제"]="ar02"
    ["여교황"]="ar02"
    ["여제"]="ar03"
    ["황후"]="ar03"
    ["황제"]="ar04"
    ["교황"]="ar05"
    ["사제"]="ar05"
    ["연인"]="ar06"
    ["연인들"]="ar06"
    ["전차"]="ar07"
    ["힘"]="ar08"
    ["은둔자"]="ar09"
    ["운명의수레바퀴"]="ar10"
    ["운명의바퀴"]="ar10"
    ["정의"]="ar11"
    ["매달린사람"]="ar12"
    ["죽음"]="ar13"
    ["절제"]="ar14"
    ["악마"]="ar15"
    ["탑"]="ar16"
    ["별"]="ar17"
    ["달"]="ar18"
    ["태양"]="ar19"
    ["심판"]="ar20"
    ["세계"]="ar21"
)

# Cups (컵) - 14장
declare -A CUPS=(
    ["컵에이스"]="cuac"
    ["컵의에이스"]="cuac"
    ["컵1"]="cuac"
    ["컵2"]="cu02"
    ["컵3"]="cu03"
    ["컵4"]="cu04"
    ["컵5"]="cu05"
    ["컵6"]="cu06"
    ["컵7"]="cu07"
    ["컵8"]="cu08"
    ["컵9"]="cu09"
    ["컵10"]="cu10"
    ["컵시종"]="cupa"
    ["컵의시종"]="cupa"
    ["컵기사"]="cukn"
    ["컵의기사"]="cukn"
    ["컵여왕"]="cuqu"
    ["컵의여왕"]="cuqu"
    ["컵왕"]="cuki"
    ["컵의왕"]="cuki"
)

# Wands (완드/지팡이) - 14장
declare -A WANDS=(
    ["완드에이스"]="waac"
    ["완드의에이스"]="waac"
    ["지팡이에이스"]="waac"
    ["지팡이의에이스"]="waac"
    ["완드1"]="waac"
    ["지팡이1"]="waac"
    ["완드2"]="wa02"
    ["지팡이2"]="wa02"
    ["완드3"]="wa03"
    ["지팡이3"]="wa03"
    ["완드4"]="wa04"
    ["지팡이4"]="wa04"
    ["완드5"]="wa05"
    ["지팡이5"]="wa05"
    ["완드6"]="wa06"
    ["지팡이6"]="wa06"
    ["완드7"]="wa07"
    ["지팡이7"]="wa07"
    ["완드8"]="wa08"
    ["지팡이8"]="wa08"
    ["완드9"]="wa09"
    ["지팡이9"]="wa09"
    ["완드10"]="wa10"
    ["지팡이10"]="wa10"
    ["완드시종"]="wapa"
    ["완드의시종"]="wapa"
    ["지팡이시종"]="wapa"
    ["지팡이의시종"]="wapa"
    ["완드기사"]="wakn"
    ["완드의기사"]="wakn"
    ["지팡이기사"]="wakn"
    ["지팡이의기사"]="wakn"
    ["완드여왕"]="waqu"
    ["완드의여왕"]="waqu"
    ["지팡이여왕"]="waqu"
    ["지팡이의여왕"]="waqu"
    ["완드왕"]="waki"
    ["완드의왕"]="waki"
    ["지팡이왕"]="waki"
    ["지팡이의왕"]="waki"
)

# Swords (소드/검) - 14장
declare -A SWORDS=(
    ["소드에이스"]="swac"
    ["소드의에이스"]="swac"
    ["검에이스"]="swac"
    ["검의에이스"]="swac"
    ["소드1"]="swac"
    ["검1"]="swac"
    ["소드2"]="sw02"
    ["검2"]="sw02"
    ["소드3"]="sw03"
    ["검3"]="sw03"
    ["소드4"]="sw04"
    ["검4"]="sw04"
    ["소드5"]="sw05"
    ["검5"]="sw05"
    ["소드6"]="sw06"
    ["검6"]="sw06"
    ["소드7"]="sw07"
    ["검7"]="sw07"
    ["소드8"]="sw08"
    ["검8"]="sw08"
    ["소드9"]="sw09"
    ["검9"]="sw09"
    ["소드10"]="sw10"
    ["검10"]="sw10"
    ["소드시종"]="swpa"
    ["소드의시종"]="swpa"
    ["검시종"]="swpa"
    ["검의시종"]="swpa"
    ["소드기사"]="swkn"
    ["소드의기사"]="swkn"
    ["검기사"]="swkn"
    ["검의기사"]="swkn"
    ["소드여왕"]="swqu"
    ["소드의여왕"]="swqu"
    ["검여왕"]="swqu"
    ["검의여왕"]="swqu"
    ["소드왕"]="swki"
    ["소드의왕"]="swki"
    ["검왕"]="swki"
    ["검의왕"]="swki"
)

# Pentacles (펜타클/동전) - 14장
declare -A PENTACLES=(
    ["펜타클에이스"]="peac"
    ["펜타클의에이스"]="peac"
    ["동전에이스"]="peac"
    ["동전의에이스"]="peac"
    ["펜타클1"]="peac"
    ["동전1"]="peac"
    ["펜타클2"]="pe02"
    ["동전2"]="pe02"
    ["펜타클3"]="pe03"
    ["동전3"]="pe03"
    ["펜타클4"]="pe04"
    ["동전4"]="pe04"
    ["펜타클5"]="pe05"
    ["동전5"]="pe05"
    ["펜타클6"]="pe06"
    ["동전6"]="pe06"
    ["펜타클7"]="pe07"
    ["동전7"]="pe07"
    ["펜타클8"]="pe08"
    ["동전8"]="pe08"
    ["펜타클9"]="pe09"
    ["동전9"]="pe09"
    ["펜타클10"]="pe10"
    ["동전10"]="pe10"
    ["펜타클시종"]="pepa"
    ["펜타클의시종"]="pepa"
    ["동전시종"]="pepa"
    ["동전의시종"]="pepa"
    ["펜타클기사"]="pekn"
    ["펜타클의기사"]="pekn"
    ["동전기사"]="pekn"
    ["동전의기사"]="pekn"
    ["펜타클여왕"]="pequ"
    ["펜타클의여왕"]="pequ"
    ["동전여왕"]="pequ"
    ["동전의여왕"]="pequ"
    ["펜타클왕"]="peki"
    ["펜타클의왕"]="peki"
    ["동전왕"]="peki"
    ["동전의왕"]="peki"
)

# 파일명 변환 함수
convert_filename() {
    local file="$1"
    local basename=$(basename "$file")
    local extension="${basename##*.}"
    local filename="${basename%.*}"

    # 공백과 특수문자 제거, 소문자로 변환
    local clean_name=$(echo "$filename" | tr -d ' _-' | tr '[:upper:]' '[:lower:]')

    # Major Arcana 확인
    if [[ -n "${MAJOR_ARCANA[$clean_name]}" ]]; then
        echo "${MAJOR_ARCANA[$clean_name]}.jpg"
        return 0
    fi

    # Cups 확인
    if [[ -n "${CUPS[$clean_name]}" ]]; then
        echo "${CUPS[$clean_name]}.jpg"
        return 0
    fi

    # Wands 확인
    if [[ -n "${WANDS[$clean_name]}" ]]; then
        echo "${WANDS[$clean_name]}.jpg"
        return 0
    fi

    # Swords 확인
    if [[ -n "${SWORDS[$clean_name]}" ]]; then
        echo "${SWORDS[$clean_name]}.jpg"
        return 0
    fi

    # Pentacles 확인
    if [[ -n "${PENTACLES[$clean_name]}" ]]; then
        echo "${PENTACLES[$clean_name]}.jpg"
        return 0
    fi

    return 1
}

# 모든 이미지 파일 처리
echo "🔄 파일명 변환 시작..."
echo ""

for file in $SOURCE_DIR/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    [ -e "$file" ] || continue

    # .gitkeep 파일 건너뛰기
    if [[ $(basename "$file") == ".gitkeep" ]]; then
        continue
    fi

    # 이미 영문 파일명이면 건너뛰기
    basename=$(basename "$file")
    if [[ $basename =~ ^(ar|cu|wa|sw|pe)[0-9a-z]{2,4}\.(jpg|jpeg|png|JPG|JPEG|PNG)$ ]]; then
        echo "⏭️  건너뜀: $basename (이미 변환된 파일명)"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    # 변환 시도
    new_name=$(convert_filename "$file")

    if [ $? -eq 0 ]; then
        new_path="$SOURCE_DIR/$new_name"

        # 파일이 이미 존재하는지 확인
        if [ -e "$new_path" ]; then
            echo "⚠️  건너뜀: $(basename "$file") → $new_name (이미 존재함)"
            SKIPPED=$((SKIPPED + 1))
        else
            mv "$file" "$new_path"
            echo "✅ 변환: $(basename "$file") → $new_name"
            CONVERTED=$((CONVERTED + 1))
        fi
    else
        echo "❌ 실패: $(basename "$file") (매칭되는 카드명 없음)"
        SKIPPED=$((SKIPPED + 1))
    fi
done

echo ""
echo "=== 변환 완료 ==="
echo "✅ 변환됨: $CONVERTED 개"
echo "⏭️  건너뜀: $SKIPPED 개"
echo ""

# 최종 확인
TOTAL_COUNT=$(ls $SOURCE_DIR/*.jpg 2>/dev/null | wc -l)
echo "📊 현재 JPG 파일 개수: $TOTAL_COUNT / 78"

if [ $TOTAL_COUNT -eq 78 ]; then
    echo "🎉 모든 타로 카드가 준비되었습니다!"
else
    echo "⚠️  $((78 - TOTAL_COUNT))장의 카드가 누락되었습니다."
fi

echo ""
echo "백업 위치: $BACKUP_DIR"
