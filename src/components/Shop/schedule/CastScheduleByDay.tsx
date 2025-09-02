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
import { gradeMap } from '@/constants/castGradeMap';
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
            <ul
              className={clsx(styles.castList, {
                [styles.isToday]: selectedDate === schedules[0]?.date,
              })}
            >
              {selectedSchedule.casts.map((cast) => {
                const gradeClassName = gradeMap[cast.gradeId]?.className;

                return (
                  <li key={cast.castId} className={styles.castItem}>
                    {cast.realTimeStatus && (
                      <div
                        className={`${styles.realTImeDetail} ${
                          [3, 4, 5].includes(cast.realTimeStatus)
                            ? styles.statusNa
                            : ''
                        }`}
                      >
                        {cast.realTimeDetail}
                      </div>
                    )}

                    <div className={styles.wrapTodayTime}>
                      {cast.startTime && cast.endTime && (
                        <>
                          <span>{cast.startTime}</span>
                          <span>{cast.endTime}</span>
                        </>
                      )}
                      {cast.scheduleStatus && (
                        <p className={styles.scheduleStatus}>
                          {cast.scheduleStatus}
                        </p>
                      )}
                    </div>
                    <Link href={cast.castUrl}>
                      <div className={styles.wrapBadge}>
                        {/* 新人さん or 体験入店（どちらか一方） */}
                        {cast.badges?.includes('trial') ? (
                          <span
                            className={`${styles.labelBadge} ${styles.badgeTrial}`}
                          >
                            体験
                            <br />
                            入店
                          </span>
                        ) : cast.badges?.includes('new') ? (
                          <span
                            className={`${styles.labelBadge} ${styles.badgeNew}`}
                          >
                            新人さん
                          </span>
                        ) : null}

                        {/* 人気急上昇は常に表示 */}
                        {cast.badges?.includes('spotlight') && (
                          <span
                            className={`${styles.labelBadge} ${styles.badgeHot}`}
                          >
                            人気
                            <br />
                            急上昇
                          </span>
                        )}
                      </div>
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
                  </li>
                );
              })}
            </ul>
          )}
        </article>
      </section>
    </>
  );
};
export default CastScheduleByDay;
