#!/bin/bash

# 수동 파일명 변환 스크립트 (변환되지 않은 파일들 처리)

cd public/cards

echo "=== 수동 파일명 변환 시작 ==="

# Major Arcana (번호 형식)
[ -f "0. 바보 카드.jpg" ] && mv "0. 바보 카드.jpg" "ar00.jpg" && echo "✅ 바보 → ar00.jpg"
[ -f "1. 마법사 카드.jpg" ] && mv "1. 마법사 카드.jpg" "ar01.jpg" && echo "✅ 마법사 → ar01.jpg"
[ -f "2. 여사제 카드.jpg" ] && mv "2. 여사제 카드.jpg" "ar02.jpg" && echo "✅ 여사제 → ar02.jpg"
[ -f "3. 여황제 카드.jpg" ] && mv "3. 여황제 카드.jpg" "ar03.jpg" && echo "✅ 여황제 → ar03.jpg"
[ -f "4. 황제 카드.jpg" ] && mv "4. 황제 카드.jpg" "ar04.jpg" && echo "✅ 황제 → ar04.jpg"
[ -f "5. 교황 카드.jpg" ] && mv "5. 교황 카드.jpg" "ar05.jpg" && echo "✅ 교황 → ar05.jpg"
[ -f "6. 연인 카드.jpg" ] && mv "6. 연인 카드.jpg" "ar06.jpg" && echo "✅ 연인 → ar06.jpg"
[ -f "7. 전차 카드.jpg" ] && mv "7. 전차 카드.jpg" "ar07.jpg" && echo "✅ 전차 → ar07.jpg"
[ -f "8. 힘 카드.jpg" ] && mv "8. 힘 카드.jpg" "ar08.jpg" && echo "✅ 힘 → ar08.jpg"
[ -f "9. 은둔자 카드.jpg" ] && mv "9. 은둔자 카드.jpg" "ar09.jpg" && echo "✅ 은둔자 → ar09.jpg"
[ -f "10. 운명의 수레바퀴.jpg" ] && mv "10. 운명의 수레바퀴.jpg" "ar10.jpg" && echo "✅ 운명의바퀴 → ar10.jpg"
[ -f "11. 정의 카드.jpg" ] && mv "11. 정의 카드.jpg" "ar11.jpg" && echo "✅ 정의 → ar11.jpg"
[ -f "12. 행맨 카드.jpg" ] && mv "12. 행맨 카드.jpg" "ar12.jpg" && echo "✅ 행맨 → ar12.jpg"
[ -f "13. 죽음 카드.jpg" ] && mv "13. 죽음 카드.jpg" "ar13.jpg" && echo "✅ 죽음 → ar13.jpg"
[ -f "14. 절제 카드.jpg" ] && mv "14. 절제 카드.jpg" "ar14.jpg" && echo "✅ 절제 → ar14.jpg"
[ -f "15. 악마 카드.jpg" ] && mv "15. 악마 카드.jpg" "ar15.jpg" && echo "✅ 악마 → ar15.jpg"
[ -f "16. 타워 카드.jpg" ] && mv "16. 타워 카드.jpg" "ar16.jpg" && echo "✅ 타워 → ar16.jpg"
[ -f "17. 별 카드.jpg" ] && mv "17. 별 카드.jpg" "ar17.jpg" && echo "✅ 별 → ar17.jpg"
[ -f "18. 달 카드.jpg" ] && mv "18. 달 카드.jpg" "ar18.jpg" && echo "✅ 달 → ar18.jpg"
[ -f "19. 태양 카드.jpg" ] && mv "19. 태양 카드.jpg" "ar19.jpg" && echo "✅ 태양 → ar19.jpg"
[ -f "20. 심판 카드.jpg" ] && mv "20. 심판 카드.jpg" "ar20.jpg" && echo "✅ 심판 → ar20.jpg"
[ -f "21. 세계 카드.jpg" ] && mv "21. 세계 카드.jpg" "ar21.jpg" && echo "✅ 세계 → ar21.jpg"

# Court Cards - Cups
[ -f "컵 페이지.jpg" ] && mv "컵 페이지.jpg" "cupa.jpg" && echo "✅ 컵 페이지 → cupa.jpg"
[ -f "컵 나이트.jpg" ] && mv "컵 나이트.jpg" "cukn.jpg" && echo "✅ 컵 나이트 → cukn.jpg"
[ -f "컵 퀸.jpg" ] && mv "컵 퀸.jpg" "cuqu.jpg" && echo "✅ 컵 퀸 → cuqu.jpg"
[ -f "컵 킹.jpg" ] && mv "컵 킹.jpg" "cuki.jpg" && echo "✅ 컵 킹 → cuki.jpg"

# Court Cards - Wands
[ -f "완드 페이지.jpg" ] && mv "완드 페이지.jpg" "wapa.jpg" && echo "✅ 완드 페이지 → wapa.jpg"
[ -f "완드 나이트.jpg" ] && mv "완드 나이트.jpg" "wakn.jpg" && echo "✅ 완드 나이트 → wakn.jpg"
[ -f "완드 퀸.jpg" ] && mv "완드 퀸.jpg" "waqu.jpg" && echo "✅ 완드 퀸 → waqu.jpg"
[ -f "완드 킹.jpg" ] && mv "완드 킹.jpg" "waki.jpg" && echo "✅ 완드 킹 → waki.jpg"

# Court Cards - Swords
[ -f "소드 페이지.jpg" ] && mv "소드 페이지.jpg" "swpa.jpg" && echo "✅ 소드 페이지 → swpa.jpg"
[ -f "소드 나이트.jpg" ] && mv "소드 나이트.jpg" "swkn.jpg" && echo "✅ 소드 나이트 → swkn.jpg"
[ -f "소드 퀸.jpg" ] && mv "소드 퀸.jpg" "swqu.jpg" && echo "✅ 소드 퀸 → swqu.jpg"
[ -f "소드 킹.jpg" ] && mv "소드 킹.jpg" "swki.jpg" && echo "✅ 소드 킹 → swki.jpg"

# Court Cards - Pentacles
[ -f "펜타클 페이지.jpg" ] && mv "펜타클 페이지.jpg" "pepa.jpg" && echo "✅ 펜타클 페이지 → pepa.jpg"
[ -f "펜타클 나이트.jpg" ] && mv "펜타클 나이트.jpg" "pekn.jpg" && echo "✅ 펜타클 나이트 → pekn.jpg"
[ -f "펜타클 퀸.jpg" ] && mv "펜타클 퀸.jpg" "pequ.jpg" && echo "✅ 펜타클 퀸 → pequ.jpg"
[ -f "펜타클 킹.jpg" ] && mv "펜타클 킹.jpg" "peki.jpg" && echo "✅ 펜타클 킹 → peki.jpg"

echo ""
echo "=== 변환 완료 ==="

# 최종 개수 확인
cd ../..
bash scripts/check-images.sh
