/* =======================================
 * 神戸ホットポイント メニュー項目
 * URL: src/data/hot/navMenuData.ts
 * Created: 2025-08-21
 * Last updated: 2025-09-15
 * ======================================= */
export const navMenu = [
  { id: 'navTop', href: '/hot/', label: 'トップ', labelEn: 'top' },
  {
    id: 'navReserve',
    href: 'https://www.cityheaven.net/hyogo/A2802/A280201/koubehp/S6ShopReservation/?pcmode=sp',
    label: 'ネット予約',
    labelEn: 'reservation',
    target: true,
  },
  {
    id: 'navRealTime',
    href: '/hot/realtime/',
    label: 'リアルタイム',
    labelEn: 'real time info ',
  },
  {
    id: 'navSchedule',
    href: '/hot/schedule/',
    label: '出勤情報',
    labelEn: 'schedule',
  },
  {
    id: 'navCastList',
    href: '/hot/cast/',
    label: '在籍一覧',
    labelEn: 'cast list',
  },
  {
    id: 'navPhotoBlog',
    href: 'https://www.cityheaven.net/hyogo/A2802/A280201/koubehp/diarylist/?of=y',
    label: '写メ日記',
    labelEn: 'blog',
    target: true,
  },
  {
    id: 'navEvent',
    href: 'https://www.cityheaven.net/hyogo/A2802/A280201/koubehp/shopevent/',
    label: 'イベント',
    labelEn: 'event',
    target: true,
  },
  {
    id: 'navSystem',
    href: '/hot/system/',
    label: 'システム',
    labelEn: 'system',
  },
  {
    id: 'navRecruit',
    href: 'https://kobe-baito.jp/',
    label: '求人情報',
    labelEn: 'job offer',
    target: true,
  },
];
