/* =======================================
 * 出勤情報日別 コンポーネント
 * URL:src/components/Shop/schedule/CastScheduleByDay.tsx
 * Referenced in: :src/app/hot/weekly-schedule/page.tsx
 * Created: 2025-09-01
 * Last updated: 2025-09-01
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

type ScheduleData = {
  date: string;
  casts: CastDetail[];
};

const CastScheduleByDay = () => {
  const pathname = usePathname();
  const path = pathname.split('/')[1];

  const storeIdMap: Record<string, string> = {
    hot: 'kbHot',
    villa: 'kbVilla',
  };
  const activeStoreClass = storeIdMap[path];

  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const selectedSchedule = schedules.find((s) => s.date === selectedDate);

  useEffect(() => {
    const loadSchedules = async () => {
      const config = await loadScheduleConfig(path);
      const dateList = getDateList(config.switchHour, config.days);
      const basePath = `/data/${path}/schedule`;
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
  }, [path]);

  useEffect(() => {
    if (schedules.length > 0 && !selectedDate) {
      setSelectedDate(schedules[0].date);
    }
  }, [schedules, selectedDate]);

  return (
    <>
      <section className={clsx(styles.containerHead, styles[activeStoreClass])}>
        <Link
          href={`/${path}/weekly-schedule/`}
          className={styles.linkByPeriod}
        >
          一覧表示はコチラ
        </Link>
        <nav>
          <Link
            href="/hot/weekly-schedule/"
            className={clsx(styles.shopHot, path === 'hot' && styles.isActive)}
          >
            神戸ホットポイント
          </Link>
          <Link
            href="/villa/weekly-schedule/"
            className={clsx(
              styles.shopVilla,
              path === 'villa' && styles.isActive
            )}
          >
            ホットポイント VILLA
          </Link>
        </nav>
      </section>
      <section
        className={clsx(styles.containerContents, styles[activeStoreClass])}
      >
        <article className={styles.blockByDay}>
          <nav>
            {schedules.map((schedule) => {
              const dateObj = new Date(schedule.date);
              const display = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
              const youbi = ['日', '月', '火', '水', '木', '金', '土'][
                dateObj.getDay()
              ];
              return (
                <div
                  key={schedule.date}
                  className={clsx({
                    [styles.isActive]: schedule.date === selectedDate,
                  })}
                >
                  <button
                    onClick={() => setSelectedDate(schedule.date)}
                    className={clsx(styles.tabButton, {
                      [styles.isActive]: schedule.date === selectedDate,
                    })}
                  >
                    {display}
                    <span>{youbi}</span>
                  </button>
                </div>
              );
            })}
          </nav>
          {selectedSchedule && (
            <ul className={styles.castList}>
              {selectedSchedule.casts.map((cast) => (
                <li key={cast.castId} className={styles.castItem}>
                  <Link href={cast.castUrl} className={styles.imageWrap}>
                    <Image
                      src={cast.castImageSquare || cast.castImage}
                      alt={cast.castName}
                      fill
                    />
                  </Link>
                  <div className={styles.castInfo}>
                    <p className={styles.castName}>{cast.castName}</p>
                    <p className={styles.castTime}>
                      {cast.startTime} - {cast.endTime}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </>
  );
};
export default CastScheduleByDay;
