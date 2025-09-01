/* =======================================
 * 店舗 リアルタイムコンポーネント
 * URL: src/components/Shop/ContainerRealTime.tsx
 * Referenced in: src/app/hot/realtime/page.tsx
 * Created: 2025-08-29
 * Last updated: 2025-08-29
 * ======================================= */
'use client';

import styles from '@/styles/components/ShopRealtime.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import type { CastDetail } from '@/types/CastDetails';
import Link from 'next/link';
import { gradeMap } from '@/components/castGradeMap';

type RealTimeProps = {
  jsonPath: string;
};

// realTimeStatus に対応するラベル
const STATUS_LABELS: Record<string, string> = {
  '1': '現在受付中',
  '2': '残りわずか',
  '3': '残り1枠 電話にてお問い合わせください',
  '4': 'キャンセル待ち',
  '5': '予約受付中',
  '6': '受付終了、次回のご予約受付致します',
};

type CastWithStatus = CastDetail & {
  realTimeStatus: string | number;
};

const ContainerRealtime = ({ jsonPath }: RealTimeProps) => {
  const pathname = usePathname();
  const path = pathname.split('/')[1];

  const storeIdMap: Record<string, string> = {
    hot: 'kbHot',
    villa: 'kbVilla',
  };
  const storeId = storeIdMap[path];

  const [castData, setCastData] = useState<CastWithStatus[]>([]);
  const [updateTime, setUpdateTime] = useState<string>('');

  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCastData(data[0].castData || []);
          setUpdateTime(data[0].upDateTime || '');
        }
      });
  }, [jsonPath]);

  const realTimeStatus = castData.reduce(
    (acc: Record<string, CastWithStatus[]>, item) => {
      const key = String(item.realTimeStatus);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {}
  );

  return (
    <section className={clsx(styles.containerRealtime, styles[storeId])}>
      <div className={styles.boxUpDateTime}>
        <div className={styles.itemTime}>
          <span>更新時間</span>
          <time dateTime={updateTime}>
            {new Date(updateTime).toLocaleTimeString('ja-JP', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        </div>
        <p>
          表示時間には多少ずれが生じる場合があります。詳しくはお電話にてご確認下さい
        </p>
      </div>
      {Object.entries(realTimeStatus).map(([status, list]) => (
        <article
          key={status}
          className={clsx(styles.statusGroup, styles[`status${status}`])}
        >
          <h3 className={styles.statusTitle}>
            {STATUS_LABELS[status] ?? '未設定'}
          </h3>
          <ul className={styles.castList}>
            {list.map((cast) => {
              const gradeClassName = gradeMap[cast.gradeId]?.className;
              return (
                <li
                  key={cast.castId}
                  className={`${styles.itemCast} ${styles[cast.shopId]}`}
                >
                  <Link href={cast.castUrl} className={styles.boxImage}>
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
                  <div className={styles.boxDetails}>
                    <div className={styles.realTImeDetail}>
                      {cast.realTimeDetail}
                    </div>
                    <div className={styles.castProfile}>
                      <div className={styles.wrapName}>
                        <p className={styles.castName}>{cast.castName}</p>
                        <span className={styles.age}>{cast.age}</span>
                      </div>
                      <div className={styles.castSize}>
                        <span className={styles.tall}>{cast.tall}</span>
                        <span className={styles.bust}>
                          {cast.bust}
                          <i>{cast.cup}</i>
                        </span>
                        <span className={styles.west}>{cast.west}</span>
                        <span className={styles.hip}>{cast.hip}</span>
                      </div>
                    </div>
                    <div className={styles.wrapTodayTime}>
                      <h4>出勤時間</h4>
                      <div className={styles.innerTime}>
                        <span>{cast.startTime}</span>
                        <span>{cast.endTime}</span>
                      </div>
                    </div>
                  </div>
                  {cast.realTimeComment && (
                    <div className={styles.boxComment}>
                      <p>{cast.realTimeComment}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </section>
  );
};

export default ContainerRealtime;
