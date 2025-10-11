/* =======================================
 * 店舗データ
 * URL:src/data/AreaShopData.ts
 * Created: 2025-08-19
 * Last updated: 2025-08-19
 * ======================================= */

import LogoHot from '@/assets/images/logo/kobe-hot.webp';
import LogoVilla from '@/assets/images/logo/kobe-villa.webp';
// import LogoStyle from '@/assets/images/logo/kobe-style.webp';
import { StaticImageData } from 'next/image';

export type Shop = {
  storeId: string;
  name: string;
  nameEn: string;
  post: string;
  address: string;
  logo: StaticImageData;
  svgLogo: string;
  phone: string;
  url: string;
  shopColor?: string;
  mapUrl?: string;
};

export const Shops = [
  {
    storeId: 'kbHot',
    name: '神戸ホットポイント',
    nameEn: 'kobe hotpoint',
    logo: LogoHot,
    svgLogo: '#svg_logoKobeHot',
    post: '〒650-0012',
    address: '兵庫県神戸市中央区北長狭通２丁目１−４',
    phone: '078-332-0388',
    url: '/hot/top/',
    shopColor: '#3da3fc',
    mapUrl: 'https://maps.app.goo.gl/epJdH7BtHsccYyGdA',
  },
  {
    storeId: 'kbVilla',
    name: 'ホットポイントヴィラ',
    nameEn: 'hotpoint villa',
    logo: LogoVilla,
    svgLogo: '#svg_logoKobeVilla',
    post: '〒650-0012',
    address: '兵庫県神戸市中央区北長狭通１丁目１０−１３',
    phone: '078-332-3666',
    url: '/villa/top/',
    shopColor: '#db3dfc',
    mapUrl: 'https://maps.app.goo.gl/[VillaのGoogleマップURL]',
  },
  // {
  //   storeId: 'kbStyle',
  //   name: 'ホットポイント スタイル',
  //   logo: LogoStyle,
  //   post: '〒650-0012',
  //   address: '兵庫県神戸市中央区北長狭通２丁目１−５',
  //   phone: '078-332-5088',
  //   url: '/style/',
  //   shopColor: '#ff558b',
  // },
];
