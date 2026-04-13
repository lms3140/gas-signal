# Gas Signal

천연가스 저장량과 HDD 데이터를 한 화면에서 확인하는 대시보드입니다.

## Features

- 주간 천연가스 저장량 차트
- HDD 요약 카드
- 핵심 지표 패널

핵심 지표 패널은 아래 세 값만 보여줍니다.

- HDD 평년 대비
- 현재 저장량
- 전주 대비 저장량 변화

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

## Data Source

- API: `https://gas.prupruapiapp.store/api/gas?weeks=58`

응답에는 저장량 시계열, HDD 주간 데이터, 저장 지역(`storageDuoArea`), 저장 단위(`units`)가 포함됩니다.

## Project Structure

```text
app/
├─ _components/
│  ├─ EiaChart.tsx
│  ├─ GasDashboard.tsx
│  ├─ WeeklyHddStatsCard.tsx
│  └─ gasScorePanel/
│     ├─ GasPanelCards.tsx
│     └─ GasPanelHeader.tsx
├─ api/
│  └─ gasType.ts
├─ eiaType.ts
├─ globals.css
├─ layout.tsx
└─ page.tsx
```

## Notes

- 저장량 데이터는 `period` 기준으로 정렬해 사용합니다.
- `recentStorageChange` 는 최근 누적 변화가 아니라 `latest storage - previous storage` 기준의 전주 대비 변화입니다.
- 점수형 요약 대신 설명 가능한 1차 지표만 보여주도록 구성했습니다.
