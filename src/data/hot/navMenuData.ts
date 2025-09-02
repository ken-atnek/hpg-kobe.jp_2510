/* =======================================
 * 神戸ホットポイント メニュー項目
 * URL: src/data/hot/navMenuData.ts
 * Created: 2025-08-21
 * Last updated: 2025-08-27
 * ======================================= */
export const navMenu = [
  { href: '/hot/', label: 'トップ' },
  {
    href: 'https://www.cityheaven.net/hyogo/A2802/A280201/koubehp/S6ShopReservation/?pcmode=sp',
    label: 'ネット予約',
    target: true,
  },
  { href: '/hot/realtime/', label: 'リアルタイム' },
  { href: '/hot/schedule/', label: '出勤情報' },
  { href: '/hot/cast/', label: '在籍一覧' },
  {
    href: 'https://www.cityheaven.net/hyogo/A2802/A280201/koubehp/diarylist/?of=y',
    label: '写メ日記',
    target: true,
  },
  { href: '/hot/system/', label: 'システム' },
  { href: 'https://kobe-baito.jp/', label: '求人情報', target: true },
];
