/* =======================================
 *神戸ホットポイントグループ 年齢認証 キャスト画像
 * URL: src/components/Entrance/CastList.tsx
 * Referenced in: src/components/Entrance/Entrance.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */
import styles from '@/styles/Entrance.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
    fetch('/data/entranceCastData.json')
      .then((res) => res.json())
      .then((data: ListItem[]) => setCastData(data));
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
    </ul>
  );
};
export default EntranceCastList;
