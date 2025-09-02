'use client';

/* =======================================
 * 神戸ホットポイントグループ リアルタイム
 * URL:src/components/AreaTop/BlockRealTIme.tsx
 * Referenced in: /app/page.tsx
 * Created: 2025-08-23
 * Last updated: 2025-08-23
 * ======================================= */
import styles from '@/styles/AreaTop.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gradeMap } from '@/constants/castGradeMap';
type CastItem = {
  castId: string;
  castName: string;
  shopId: string;
  shopName: string;
  castImage: string;
  realTimeStatus: number;
  realTimeDetail: string;
  realTimeStart?: string;
  startTime: string;
  endTime: string;
  gradeId: number;
  age: string;
  tall: string;
  bust: string;
  cup: string;
  west: string;
  hip: string;
  castUrl: string;
};

// cast.gradeId から className を取得（例: 'grade6'）

// ショップIDから表示ラベルへのマッピング
const SHOP_LABELS: Record<string, string> = {
  hot: 'KOBE',
  villa: 'VILLA',
  // style: 'STYLE',
};

const BlockRealTIme = () => {
  const [castList, setCastList] = useState<CastItem[]>([]);

  useEffect(() => {
    fetch('/data/area-top/areaTopRealTime.json')
      .then((res) => res.json())
      .then((data) => {
        const getPriority = (status: number) => {
          switch (status) {
            case 1:
              return 0; // 受付中
            case 2:
              return 1; // 残りわずか
            case 3:
              return 2; // 受付終了間近
            case 4:
              return 3; // 本日終了
            case 5:
              return 4; // 未出勤
            default:
              return 5; // 不明
          }
        };
        const sortedData = data.sort(
          (a: CastItem, b: CastItem) =>
            getPriority(a.realTimeStatus) - getPriority(b.realTimeStatus)
        );
        setCastList(sortedData);
      })
      .catch((error) => console.error('データ取得エラー:', error));
  }, []);
  return (
    <ul className={styles.listRealTime}>
      {castList.map((cast) => {
        const gradeClassName = gradeMap[cast.gradeId]?.className;
        return (
          <li
            key={cast.castId}
            className={`${styles.itemCast} ${styles[cast.shopId]}`}
          >
            <div
              className={`${styles.realTImeDetail} ${
                [3, 4, 5].includes(cast.realTimeStatus) ? styles.statusNa : ''
              }`}
            >
              {cast.realTimeDetail}
            </div>
            <div className={styles.wrapTodayTime}>
              <span>{cast.startTime}</span>
              <span>{cast.endTime}</span>
            </div>
            <Link href={cast.castUrl}>
              <div
                className={`${styles.wrapPhoto} ${gradeClassName ? styles[gradeClassName] : ''}`}
              >
                {cast.gradeId >= 1 && cast.gradeId <= 8 && (
                  <div className={styles.gradeFrame}></div>
                )}
                <span className={styles.gradeLabel}>
                  {gradeMap[cast.gradeId]?.label}
                </span>
                <Image src={cast.castImage} alt={cast.castName} fill />
              </div>
            </Link>
            <div className={styles.castProfile}>
              <div className={styles.wrapName}>
                <p className={styles.castName}>{cast.castName}</p>
                <div className={styles.shopName}>
                  {SHOP_LABELS[cast.shopId] || ''}
                </div>
              </div>
              <div className={styles.castSize}>
                <span className={styles.age}>{cast.age}</span>
                <span className={styles.tall}>{cast.tall}</span>
                <span className={styles.bust}>
                  {cast.bust}
                  <i>{cast.cup}</i>
                </span>
                <span className={styles.west}>{cast.west}</span>
                <span className={styles.hip}>{cast.hip}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default BlockRealTIme;
