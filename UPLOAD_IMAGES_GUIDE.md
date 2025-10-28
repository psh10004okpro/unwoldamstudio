# 타로 카드 이미지 업로드 가이드

`claude/session-011CUZuaqiEJvVDb7kDPBoww` 브랜치에 78장의 타로 카드 이미지를 업로드하는 방법입니다.

## 📋 필요한 이미지 파일명 (78장)

### Major Arcana (메이저 아르카나) - 22장

```
ar00.jpg - The Fool
ar01.jpg - The Magician
ar02.jpg - The High Priestess
ar03.jpg - The Empress
ar04.jpg - The Emperor
ar05.jpg - The Hierophant
ar06.jpg - The Lovers
ar07.jpg - The Chariot
ar08.jpg - Strength
ar09.jpg - The Hermit
ar10.jpg - Wheel of Fortune
ar11.jpg - Justice
ar12.jpg - The Hanged Man
ar13.jpg - Death
ar14.jpg - Temperance
ar15.jpg - The Devil
ar16.jpg - The Tower
ar17.jpg - The Star
ar18.jpg - The Moon
ar19.jpg - The Sun
ar20.jpg - Judgement
ar21.jpg - The World
```

### Cups (컵) - 14장

```
cuac.jpg - Ace of Cups
cu02.jpg - Two of Cups
cu03.jpg - Three of Cups
cu04.jpg - Four of Cups
cu05.jpg - Five of Cups
cu06.jpg - Six of Cups
cu07.jpg - Seven of Cups
cu08.jpg - Eight of Cups
cu09.jpg - Nine of Cups
cu10.jpg - Ten of Cups
cupa.jpg - Page of Cups
cukn.jpg - Knight of Cups
cuqu.jpg - Queen of Cups
cuki.jpg - King of Cups
```

### Wands (완드) - 14장

```
waac.jpg - Ace of Wands
wa02.jpg - Two of Wands
wa03.jpg - Three of Wands
wa04.jpg - Four of Wands
wa05.jpg - Five of Wands
wa06.jpg - Six of Wands
wa07.jpg - Seven of Wands
wa08.jpg - Eight of Wands
wa09.jpg - Nine of Wands
wa10.jpg - Ten of Wands
wapa.jpg - Page of Wands
wakn.jpg - Knight of Wands
waqu.jpg - Queen of Wands
waki.jpg - King of Wands
```

### Swords (소드) - 14장

```
swac.jpg - Ace of Swords
sw02.jpg - Two of Swords
sw03.jpg - Three of Swords
sw04.jpg - Four of Swords
sw05.jpg - Five of Swords
sw06.jpg - Six of Swords
sw07.jpg - Seven of Swords
sw08.jpg - Eight of Swords
sw09.jpg - Nine of Swords
sw10.jpg - Ten of Swords
swpa.jpg - Page of Swords
swkn.jpg - Knight of Swords
swqu.jpg - Queen of Swords
swki.jpg - King of Swords
```

### Pentacles (펜타클) - 14장

```
peac.jpg - Ace of Pentacles
pe02.jpg - Two of Pentacles
pe03.jpg - Three of Pentacles
pe04.jpg - Four of Pentacles
pe05.jpg - Five of Pentacles
pe06.jpg - Six of Pentacles
pe07.jpg - Seven of Pentacles
pe08.jpg - Eight of Pentacles
pe09.jpg - Nine of Pentacles
pe10.jpg - Ten of Pentacles
pepa.jpg - Page of Pentacles
pekn.jpg - Knight of Pentacles
pequ.jpg - Queen of Pentacles
peki.jpg - King of Pentacles
```

---

## 🚀 방법 1: 로컬 Git 사용 (가장 확실)

### 1단계: 저장소 클론

```bash
git clone https://github.com/psh10004okpro/unwoldamstudio.git
cd unwoldamstudio
```

### 2단계: 브랜치 체크아웃

```bash
git checkout claude/session-011CUZuaqiEJvVDb7kDPBoww
```

### 3단계: 이미지 파일 복사

```bash
# public/cards/ 폴더에 78장의 이미지 복사
cp /path/to/your/tarot-images/*.jpg public/cards/

# 또는 하나씩
cp /path/to/ar00.jpg public/cards/ar00.jpg
cp /path/to/ar01.jpg public/cards/ar01.jpg
# ... 나머지도 동일
```

### 4단계: 파일명 확인

```bash
# 정확히 78개 파일이 있는지 확인
ls public/cards/*.jpg | wc -l

# 파일 목록 확인
ls public/cards/
```

### 5단계: Git에 추가 및 커밋

```bash
git add public/cards/*.jpg
git commit -m "feat: Add 78 Rider-Waite tarot card images"
```

### 6단계: 푸시

```bash
git push origin claude/session-011CUZuaqiEJvVDb7kDPBoww
```

---

## 🌐 방법 2: GitHub 웹사이트 (간편하지만 느림)

### 1단계: GitHub 저장소 접속

https://github.com/psh10004okpro/unwoldamstudio

### 2단계: 브랜치 전환

- 화면 왼쪽 위 "main" 드롭다운 클릭
- `claude/session-011CUZuaqiEJvVDb7kDPBoww` 선택

### 3단계: public/cards 폴더 이동

- `public` 폴더 클릭
- `cards` 폴더 클릭

### 4단계: 파일 업로드

- "Add file" 버튼 클릭
- "Upload files" 선택
- 78장의 이미지 파일을 드래그 앤 드롭
- 또는 "choose your files" 클릭하여 선택

### 5단계: 커밋

- Commit message: `feat: Add 78 Rider-Waite tarot card images`
- "Commit changes" 버튼 클릭

⚠️ **주의**: GitHub 웹은 한 번에 100개 파일 제한이 있으므로 78개는 한 번에 가능합니다.

---

## 📦 방법 3: GitHub CLI 사용

```bash
# GitHub CLI 설치 (이미 설치되어 있다면 생략)
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: 공식 문서 참조

# 인증
gh auth login

# 저장소 클론 및 브랜치 전환
gh repo clone psh10004okpro/unwoldamstudio
cd unwoldamstudio
git checkout claude/session-011CUZuaqiEJvVDb7kDPBoww

# 이미지 복사
cp /path/to/your/tarot-images/*.jpg public/cards/

# 커밋 및 푸시
git add public/cards/*.jpg
git commit -m "feat: Add 78 Rider-Waite tarot card images"
git push origin claude/session-011CUZuaqiEJvVDb7kDPBoww
```

---

## ✅ 업로드 확인

### 로컬에서 확인

```bash
# 이미지 개수 확인
ls public/cards/*.jpg | wc -l
# 출력: 78

# 일부 파일 확인
ls public/cards/ | head -10
```

### GitHub에서 확인

1. https://github.com/psh10004okpro/unwoldamstudio/tree/claude/session-011CUZuaqiEJvVDb7kDPBoww/public/cards
2. 78개 파일이 보이는지 확인

### 웹사이트에서 확인

```bash
# 로컬 개발 서버 실행
npm run dev

# http://localhost:3000/cards 접속하여 이미지가 보이는지 확인
```

---

## 🎨 이미지 자동 표시

CardImage 컴포넌트가 자동으로 처리:

1. `public/cards/ar00.jpg` 이미지 있음 → 실제 이미지 표시
2. 이미지 없음 → 기존 그라데이션 표시 (fallback)

---

## 🆓 무료 Rider-Waite 이미지 다운로드

### Wikimedia Commons (Public Domain)

1. https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck
2. 각 카드 이미지 다운로드
3. 위 파일명 규칙에 맞춰 변경

### Sacred Texts

1. https://www.sacred-texts.com/tarot/pkt/index.htm
2. Rider-Waite 카드 이미지 제공

### GitHub 저장소

```bash
# 예시 (실제 저장소는 검색 필요)
git clone https://github.com/[username]/tarot-images
```

---

## 🔧 파일명 일괄 변경 스크립트 (Bash)

```bash
#!/bin/bash
# rename-tarot-cards.sh

# 예: "00-fool.jpg" → "ar00.jpg"
# 실제 파일명에 맞춰 수정 필요

cd /path/to/downloaded/images

# Major Arcana
mv "00-fool.jpg" "ar00.jpg"
mv "01-magician.jpg" "ar01.jpg"
# ... 나머지

# Cups
mv "cups-ace.jpg" "cuac.jpg"
mv "cups-02.jpg" "cu02.jpg"
# ... 나머지
```

### PowerShell (Windows)

```powershell
# rename-tarot-cards.ps1

cd C:\path\to\downloaded\images

Rename-Item "00-fool.jpg" "ar00.jpg"
Rename-Item "01-magician.jpg" "ar01.jpg"
# ... 나머지
```

---

## ⚠️ 주의사항

1. **파일 형식**: JPG 권장 (PNG도 가능하지만 용량 큼)
2. **파일명**: 반드시 **소문자** + `.jpg` 확장자
3. **이미지 크기**: 600x900px 권장 (2:3 비율)
4. **저작권**: Public Domain 이미지 사용 권장
5. **Git 저장소 크기**: 78장 × 100KB = 약 8MB 추가

---

## 🎯 빠른 체크리스트

- [ ] 78장 이미지 다운로드 완료
- [ ] 파일명 변경 완료 (소문자 + .jpg)
- [ ] `public/cards/` 폴더에 복사
- [ ] 개수 확인 (78개)
- [ ] Git add & commit
- [ ] Push to `claude/session-011CUZuaqiEJvVDb7kDPBoww`
- [ ] GitHub에서 확인
- [ ] 로컬 개발 서버에서 테스트

---

**문제 발생 시**: 이미지가 표시되지 않아도 앱은 정상 작동합니다 (fallback 디자인 사용).
