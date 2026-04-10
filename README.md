# 천연가스 데이터 대시보드

천연가스 저장량과 난방 수요(HDD) 데이터를 한 화면에서 확인할 수 있는 대시보드 프로젝트입니다.  
주간 저장량 추이, HDD 요약, 그리고 이를 바탕으로 한 간단한 점수 요약을 함께 보여줍니다.

## 프로젝트 소개

이 프로젝트는 천연가스 관련 데이터를 시각적으로 정리해서 현재 흐름을 빠르게 확인할 수 있도록 만든 프론트엔드입니다.

화면에서는 아래 내용을 확인할 수 있습니다.

- 주간 천연가스 저장량 추이 차트
- HDD(Heating Degree Days) 요약 카드
- 저장량과 수요 데이터를 바탕으로 한 종합 점수 패널

## 사용 기술

- Next.js
- React
- TypeScript
- Recharts
- Tailwind CSS

## 데이터

이 프로젝트는 별도 백엔드에서 데이터를 받아옵니다.

- 요청 주소: `http://localhost:3005/api/gas?weeks=58`

백엔드 응답에는 저장량 시계열 데이터와 HDD 관련 정보가 포함되어 있으며, 프론트엔드는 이를 화면에 맞게 가공해 표시합니다.

## 실행 방법

```bash
npm install
npm run dev
```

실행 전 `localhost:3005`에서 API를 제공하는 백엔드가 함께 실행 중이어야 합니다.

## 주요 파일

- `app/page.tsx`: 메인 페이지
- `app/_components/EiaChart.tsx`: 저장량 차트
- `app/_components/WeeklyHddStatsCard.tsx`: HDD 요약 카드
- `app/_components/GasScorePanel.tsx`: 종합 점수 패널
- `app/util/gasCalc.ts`: 점수 계산 로직
- `app/api/gasType.ts`: 데이터 타입 정의

## 한 줄 설명

천연가스 저장량과 HDD 데이터를 시각화하고, 이를 바탕으로 현재 시장 데이터를 한눈에 볼 수 있도록 구성한 Next.js 대시보드 프로젝트입니다.
