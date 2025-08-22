/* =======================================
 * 店舗データ
 * URL:src/data/AreaShopData.ts
 * Created: 2025-08-19
 * Last updated: 2025-08-19
 * ======================================= */

import LogoHot from '@/assets/images/logo/kobe-hot.webp';
import LogoVilla from '@/assets/images/logo/kobe-villa.webp';
import LogoStyle from '@/assets/images/logo/kobe-style.webp';
import { StaticImageData } from 'next/image';

export type Shop = {
  storeId: string;
  name: string;
  nameEn: string;
  post: string;
  address: string;
  logo: StaticImageData;
  phone: string;
  url: string;
  shopColor?: string;
};

export const Shops = [
  {
    storeId: 'kbHot',
    name: '神戸ホットポイント',
    nameEn: 'kobe hotpoint',
    logo: LogoHot,
    post: '〒650-0012',
    address: '兵庫県神戸市中央区北長狭通２丁目１−４',
    phone: '078-332-0388',
    url: '/hot/',
    shopColor: '#3da3fc',
  },
  {
    storeId: 'kbVilla',
    name: 'ホットポイントヴィラ',
    nameEn: 'hotpoint villa',
    logo: LogoVilla,
    post: '〒650-0012',
    address: '兵庫県神戸市中央区北長狭通１丁目１０−１３',
    phone: '078-332-3666',
    url: '/villa/',
    shopColor: '#db3dfc',
  },
  {
    storeId: 'kbStyle',
    name: 'ホットポイント スタイル',
    logo: LogoStyle,
    post: '〒650-0012',
    address: '兵庫県神戸市中央区北長狭通２丁目１−５',
    phone: '078-332-5088',
    url: '/style/',
    shopColor: '#ff558b',
  },
];
