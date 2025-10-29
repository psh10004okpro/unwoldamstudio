# 타로 카드 한글 파일명 매핑 가이드

타로 카드 이미지를 한글 파일명으로 업로드한 후, 자동으로 영문 파일명으로 변환할 수 있습니다.

## 🚀 사용 방법

### 1단계: 한글 파일명으로 이미지 저장/업로드

편하신 한글 이름으로 저장하세요:

```
바보.jpg
마법사.jpg
여사제.jpg
컵2.jpg
완드의 에이스.jpg
...
```

### 2단계: public/cards/ 폴더에 복사

```bash
cp /path/to/한글이름/*.jpg public/cards/
```

### 3단계: 자동 변환 스크립트 실행

```bash
bash scripts/rename-korean-to-english.sh
```

스크립트가 자동으로:
- ✅ 원본 파일 백업 생성
- ✅ 한글 → 영문 파일명 변환
- ✅ 변환 결과 리포트 출력

## 📋 지원하는 한글 파일명

### Major Arcana (메이저 아르카나)

| 한글 파일명 | 변환 후 | 카드 이름 |
|------------|---------|----------|
| 바보.jpg, 광대.jpg | ar00.jpg | The Fool |
| 마법사.jpg, 마술사.jpg | ar01.jpg | The Magician |
| 여사제.jpg, 여교황.jpg | ar02.jpg | The High Priestess |
| 여제.jpg, 황후.jpg | ar03.jpg | The Empress |
| 황제.jpg | ar04.jpg | The Emperor |
| 교황.jpg, 사제.jpg | ar05.jpg | The Hierophant |
| 연인.jpg, 연인들.jpg | ar06.jpg | The Lovers |
| 전차.jpg | ar07.jpg | The Chariot |
| 힘.jpg | ar08.jpg | Strength |
| 은둔자.jpg | ar09.jpg | The Hermit |
| 운명의수레바퀴.jpg, 운명의바퀴.jpg | ar10.jpg | Wheel of Fortune |
| 정의.jpg | ar11.jpg | Justice |
| 매달린사람.jpg | ar12.jpg | The Hanged Man |
| 죽음.jpg | ar13.jpg | Death |
| 절제.jpg | ar14.jpg | Temperance |
| 악마.jpg | ar15.jpg | The Devil |
| 탑.jpg | ar16.jpg | The Tower |
| 별.jpg | ar17.jpg | The Star |
| 달.jpg | ar18.jpg | The Moon |
| 태양.jpg | ar19.jpg | The Sun |
| 심판.jpg | ar20.jpg | Judgement |
| 세계.jpg | ar21.jpg | The World |

### Cups (컵)

| 한글 파일명 | 변환 후 |
|------------|---------|
| 컵에이스.jpg, 컵의에이스.jpg, 컵1.jpg | cuac.jpg |
| 컵2.jpg | cu02.jpg |
| 컵3.jpg | cu03.jpg |
| ... | ... |
| 컵10.jpg | cu10.jpg |
| 컵시종.jpg, 컵의시종.jpg | cupa.jpg |
| 컵기사.jpg, 컵의기사.jpg | cukn.jpg |
| 컵여왕.jpg, 컵의여왕.jpg | cuqu.jpg |
| 컵왕.jpg, 컵의왕.jpg | cuki.jpg |

### Wands (완드/지팡이)

| 한글 파일명 | 변환 후 |
|------------|---------|
| 완드에이스.jpg, 지팡이에이스.jpg, 완드1.jpg | waac.jpg |
| 완드2.jpg, 지팡이2.jpg | wa02.jpg |
| ... | ... |
| 완드시종.jpg, 지팡이시종.jpg | wapa.jpg |
| 완드기사.jpg, 지팡이기사.jpg | wakn.jpg |
| 완드여왕.jpg, 지팡이여왕.jpg | waqu.jpg |
| 완드왕.jpg, 지팡이왕.jpg | waki.jpg |

### Swords (소드/검)

| 한글 파일명 | 변환 후 |
|------------|---------|
| 소드에이스.jpg, 검에이스.jpg, 소드1.jpg | swac.jpg |
| 소드2.jpg, 검2.jpg | sw02.jpg |
| ... | ... |
| 소드시종.jpg, 검시종.jpg | swpa.jpg |
| 소드기사.jpg, 검기사.jpg | swkn.jpg |
| 소드여왕.jpg, 검여왕.jpg | swqu.jpg |
| 소드왕.jpg, 검왕.jpg | swki.jpg |

### Pentacles (펜타클/동전)

| 한글 파일명 | 변환 후 |
|------------|---------|
| 펜타클에이스.jpg, 동전에이스.jpg, 펜타클1.jpg | peac.jpg |
| 펜타클2.jpg, 동전2.jpg | pe02.jpg |
| ... | ... |
| 펜타클시종.jpg, 동전시종.jpg | pepa.jpg |
| 펜타클기사.jpg, 동전기사.jpg | pekn.jpg |
| 펜타클여왕.jpg, 동전여왕.jpg | pequ.jpg |
| 펜타클왕.jpg, 동전왕.jpg | peki.jpg |

## 💡 팁

### 파일명 규칙
- 공백, 언더스코어(_), 하이픈(-) 자동 제거됨
- 대소문자 구분 없음
- 예: `컵_2.jpg`, `컵 2.jpg`, `컵2.jpg` 모두 → `cu02.jpg`

### 다양한 표현 지원
```bash
# 모두 동일하게 변환됨
"완드의 에이스.jpg"  → waac.jpg
"완드 에이스.jpg"    → waac.jpg
"완드1.jpg"         → waac.jpg
"지팡이에이스.jpg"   → waac.jpg
```

## ⚠️ 주의사항

1. **백업 자동 생성**: 원본 파일은 `public/cards/backup_날짜시간/` 폴더에 백업됩니다
2. **중복 방지**: 동일한 영문 파일명이 이미 존재하면 건너뜁니다
3. **매칭 실패**: 인식되지 않는 파일명은 건너뛰고 리포트에 표시됩니다

## 🎯 전체 프로세스 예시

```bash
# 1. 한글 파일명으로 다운로드/저장
바보.jpg
마법사.jpg
여사제.jpg
컵2.jpg
완드5.jpg
...

# 2. public/cards/에 복사
cp ~/Downloads/타로카드/*.jpg public/cards/

# 3. 변환 스크립트 실행
bash scripts/rename-korean-to-english.sh

# 출력:
# ✅ 변환: 바보.jpg → ar00.jpg
# ✅ 변환: 마법사.jpg → ar01.jpg
# ✅ 변환: 여사제.jpg → ar02.jpg
# ✅ 변환: 컵2.jpg → cu02.jpg
# ✅ 변환: 완드5.jpg → wa05.jpg
#
# === 변환 완료 ===
# ✅ 변환됨: 78 개
# ⏭️  건너뜀: 0 개
# 📊 현재 JPG 파일 개수: 78 / 78
# 🎉 모든 타로 카드가 준비되었습니다!

# 4. Git 커밋
git add public/cards/*.jpg
git commit -m "feat: Add 78 tarot card images"
git push
```

## 🔍 변환 후 확인

```bash
# 개수 확인
bash scripts/check-images.sh

# 파일 목록 확인
ls public/cards/*.jpg
```

## 🆘 문제 해결

### 변환이 안 되는 경우

1. 파일명이 지원 목록에 있는지 확인
2. 스크립트에 새로운 별칭 추가:

```bash
# scripts/rename-korean-to-english.sh 편집
["새로운한글이름"]="ar00"  # 원하는 매핑 추가
```

### 백업 파일 복원

```bash
# 최신 백업 찾기
ls -lt public/cards/backup_*/

# 복원
cp public/cards/backup_20241028_120000/*.jpg public/cards/
```

---

**한글 파일명으로 편하게 저장하고, 스크립트 한 번으로 자동 변환하세요!** 🎉
