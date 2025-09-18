/* =======================================
 * ホットポイント ヴィラ メニュー項目
 * URL: src/data/villa/navMenuData.ts
 * Created: 2025-09-17
 * Last updated: 2025-09-17
 * ======================================= */
export const navMenu = [
  { id: 'navTop', href: '/villa/', label: 'トップ', labelEn: 'top' },
  {
    id: 'navReserve',
    href: 'https://www.cityheaven.net/hyogo/A2802/A280201/koube_hp_part3/S6ShopReservation/?pcmode=sp',
    label: 'ネット予約',
    labelEn: 'reservation',
    target: true,
  },
  {
    id: 'navRealTime',
    href: '/villa/realtime/',
    label: 'リアルタイム',
    labelEn: 'real time info ',
  },
  {
    id: 'navSchedule',
    href: '/villa/schedule/',
    label: '出勤情報',
    labelEn: 'schedule',
  },
  {
    id: 'navCastList',
    href: '/villa/cast/',
    label: '在籍一覧',
    labelEn: 'cast list',
  },
  {
    id: 'navPhotoBlog',
    href: 'https://www.cityheaven.net/hyogo/A2802/A280201/koube_hp_part3/diarylist/?of=y',
    label: '写メ日記',
    labelEn: 'blog',
    target: true,
  },
  {
    id: 'navEvent',
    href: 'https://www.cityheaven.net/hyogo/A2802/A280201/koube_hp_part3/shopevent/',
    label: 'イベント',
    labelEn: 'event',
    target: true,
  },
  {
    id: 'navSystem',
    href: '/villa/system/',
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
