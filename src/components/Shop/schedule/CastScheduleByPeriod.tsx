/* =======================================
 * 出勤情報一覧 コンポーネント
 * URL:src/components/Shop/schedule/CastScheduleByPeriod.tsx
 * Referenced in: :src/app/hot/weekly-schedule/page.tsx
 * Created: 2025-08-30
 * Last updated: 2025-08-30
 * ======================================= */
'use client';
import styles from '@/styles/ShopSchedule.module.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { CastDetail } from '@/types/CastDetails';
import { loadScheduleConfig } from '@/lib/loadScheduleConfig';
import { getDateList } from '@/lib/getScheduleDataList';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';
type ScheduleData = {
  date: string;
  casts: CastDetail[];
};

const CastScheduleByPeriod = () => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);

  const [schedules, setSchedules] = useState<ScheduleData[]>([]);

  useEffect(() => {
    const loadSchedules = async () => {
      const config = await loadScheduleConfig(shop);
      const dateList = getDateList(config.switchHour, config.days);
      const basePath = `/data/${shop}/schedule`;
      const fetched = await Promise.all(
        dateList.map(async (date) => {
          const res = await fetch(`${basePath}/${date}.json`);
          const json = await res.json();
          return json as ScheduleData;
        })
      );

      setSchedules(fetched);
    };

    loadSchedules();
  }, [shop]);

  const uniqueCasts = (() => {
    const map = new Map<string, CastDetail>();
    schedules.forEach((schedule) => {
      schedule.casts.forEach((cast) => {
        if (!map.has(cast.castId)) {
          map.set(cast.castId, cast);
        }
      });
    });

    return Array.from(map.values());
  })();

  return (
    <>
      <section className={clsx(styles.containerHead, styles[activeStoreClass])}>
        <Link href={`/${shop}/schedule/`} className={styles.linkByDay}>
          日別表示はコチラ
        </Link>
        {schedules.length > 0 && (
          <div className={styles.boxPeriod}>
            <time dateTime={schedules[0].date}>
              {new Date(schedules[0].date).getFullYear()}.
              {new Date(schedules[0].date).getMonth() + 1}.
              {new Date(schedules[0].date).getDate()}
              <span>
                {
                  ['日', '月', '火', '水', '木', '金', '土'][
                    new Date(schedules[0].date).getDay()
                  ]
                }
              </span>
            </time>
            <time dateTime={schedules[schedules.length - 1].date}>
              {new Date(schedules[schedules.length - 1].date).getFullYear()}.
              {new Date(schedules[schedules.length - 1].date).getMonth() + 1}.
              {new Date(schedules[schedules.length - 1].date).getDate()}
              <span>
                {
                  ['日', '月', '火', '水', '木', '金', '土'][
                    new Date(schedules[schedules.length - 1].date).getDay()
                  ]
                }
              </span>
            </time>
            <p>の出勤表</p>
          </div>
        )}
        <nav>
          <Link
            href="/hot/schedule/"
            className={clsx(styles.shopHot, shop === 'hot' && styles.isActive)}
          >
            神戸ホットポイント
          </Link>
          <Link
            href="/villa/schedule/"
            className={clsx(
              styles.shopVilla,
              shop === 'villa' && styles.isActive
            )}
          >
            ホットポイント VILLA
          </Link>
        </nav>
      </section>
      <section
        className={clsx(styles.containerContents, styles[activeStoreClass])}
      >
        <article className={styles.blockPeriod}>
          <ul
            className={`${styles.scheduleList} ${styles['scheduleList--' + schedules.length]}`}
          >
            {/* ヘッダー（日付）行 */}
            <li className={styles.rowHeader}>
              <div className={styles.cellCastHeader}>NAME</div>
              {schedules.map((schedule, index) => (
                <div
                  key={`head-${schedule.date}-${index}`}
                  className={styles.cellDate}
                >
                  <time dateTime={schedule.date}>
                    {(() => {
                      const d = new Date(schedule.date);
                      const youbi = ['日', '月', '火', '水', '木', '金', '土'];
                      return (
                        <>
                          {d.getMonth() + 1}/{d.getDate()}
                          <span>{youbi[d.getDay()]}</span>
                        </>
                      );
                    })()}
                  </time>
                </div>
              ))}
            </li>

            {/* キャストごとの行 */}
            {uniqueCasts.map((cast) => (
              <li key={cast.castId} className={styles.row}>
                {/* キャスト情報 */}
                <div className={styles.boxCastInfo}>
                  <Link
                    href={`/${shop}/profile/?id=${cast.castId}`}
                    className={styles.wrapImage}
                  >
                    <Image
                      src={cast.castImageSquare || cast.castImage}
                      alt={cast.castName}
                      fill
                    />
                  </Link>
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
                </div>

                {/* 各日の出勤時間（または空欄） */}
                {schedules.map((schedule) => {
                  const match = schedule.casts.find(
                    (c) => c.castId === cast.castId
                  );
                  return (
                    <div
                      key={`${cast.castId}-${schedule.date}`}
                      className={styles.wrapDate}
                    >
                      {match?.startTime && match?.endTime ? (
                        <>
                          <time>{match.startTime}</time>
                          <time>{match.endTime}</time>
                        </>
                      ) : null}
                      {match?.scheduleStatus && (
                        <p className={styles.scheduleStatus}>
                          {match.scheduleStatus}
                        </p>
                      )}
                    </div>
                  );
                })}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
};
export default CastScheduleByPeriod;
