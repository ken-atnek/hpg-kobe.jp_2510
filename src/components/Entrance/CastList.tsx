/* =======================================
 *神戸ホットポイントグループ 年齢認証 キャスト画像
 * URL: src/components/Entrance/CastList.tsx
 * Referenced in: src/components/Entrance/Entrance.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */
'use client';
import styles from '@/styles/Entrance.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import GroupLogo from '@/assets/images/logo/group_hot.webp';
type ListItem = {
  castName: string;
  areaName: string;
  shopName: string;
  areaImage: string;
  castImage: string;
};

const EntranceCastList = () => {
  const [CastData, setCastData] = useState<ListItem[]>([]);

  useEffect(() => {
    const fetchCastData = async () => {
      try {
        // キャッシュバスティング用のタイムスタンプを追加
        const timestamp =
          process.env.NODE_ENV === 'development' ? Date.now() : '';
        const dataPath = `/data/entranceCastData.json${timestamp ? `?t=${timestamp}` : ''}`;

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ListItem[] = await response.json();
        setCastData(data);
      } catch {
        // エラー時の処理（何もしない）
      }
    };

    fetchCastData();
  }, []);

  return (
    <ul className={styles.entranceCastList}>
      {CastData.map((item, index) => (
        <li key={index}>
          <div className={styles.itemCastImage}>
            <Image
              src={item.castImage}
              alt={item.castName}
              width={192}
              height={288}
            />
          </div>
          <div className={styles.itemAreaImage}>
            <Image
              src={item.areaImage}
              alt={item.areaName}
              width={64}
              height={648}
            />
          </div>
          <p className={styles.areaName}>{item.areaName}</p>
          <p className={styles.castName}>{item.castName}</p>
          <p className={styles.shopName}>{item.shopName}</p>
        </li>
      ))}
      <li className={styles.mobileLogo}>
        <Image
          src={GroupLogo}
          width={100}
          height={60}
          alt="HOT POINT GROUP"
          priority
        />
      </li>
    </ul>
  );
};

export default EntranceCastList;
