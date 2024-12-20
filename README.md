# 가계부 애플리케이션

간단하고 직관적인 가계부 웹 애플리케이션입니다. 월별로 지출을 관리하고 확인할 수 있습니다.

## 주요 기능

- 월별 지출 내역 관리 (1월~12월)
- 지출 내역 추가 (날짜, 항목, 금액, 설명)
- 지출 상세 내역 확인
- 지출 내역 수정 및 삭제
- 깔끔한 사용자 인터페이스

## 기술 스택

- **Frontend**: React 18
- **Backend**: Supabase
- **Router**: React Router v7
- **Styling**: CSS, Styled Components
- **Build Tool**: Vite
- **Package Manager**: Yarn

## 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
cd my-app
```

2. 의존성 설치
```bash
yarn install
```

3. 환경 변수 설정
`.env.local` 파일을 생성하고 Supabase 설정을 추가합니다:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. 개발 서버 실행
```bash
yarn dev
```

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── CreateExpense/  # 지출 생성 폼
│   ├── ExpenseList/    # 지출 목록 표시
│   └── MonthNavigation/# 월 선택 네비게이션
├── pages/              # 페이지 컴포넌트
│   ├── Home/          # 메인 페이지
│   └── Detail/        # 상세 페이지
├── utils/             # 유틸리티 함수
└── App.jsx            # 메인 앱 컴포넌트
```

## 빌드

프로덕션 빌드를 생성하려면:
```bash
yarn build
```

## 라이선스

MIT License
