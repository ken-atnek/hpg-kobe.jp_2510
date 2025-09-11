/* =======================================
 * 店舗  プロフィール内 キャストスケジュール
 * URL: src/components/Shop/Profile/CastSchedule.tsx
 * Referenced in: src/components/Shop/Profile/CastProfile.tsx
 * Created: 2025-09-10
 * Last updated: 2025-09-10
 * ======================================= */
'use client';

import styles from '@/styles/ShopCastProfile.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type ScheduleItem = {
  date: string;
  weekday: string;
  startTime?: string;
  endTime?: string;
  scheduleStatus?: string;
};

type CastScheduleProps = {
  castId: string;
  shop: string;
};

export default function CastSchedule({ castId, shop }: CastScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/cast/${shop}/${castId}/schedule.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch schedule');
        return res.json();
      })
      .then((data: ScheduleItem[]) => {
        setSchedule(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [castId, shop]);

  if (error) return <p>スケジュールの読み込みに失敗しました。</p>;
  if (!schedule || schedule.length === 0) return null;

  return (
    <ul className={styles.scheduleList}>
      {schedule.map((item) => {
        const dateObj = new Date(item.date);
        return (
          <li key={item.date}>
            <div
              className={clsx(
                styles.wrapDate,
                item.weekday === 'sat' && styles.saturday,
                item.weekday === 'sun' && styles.sunday
              )}
            >
              <span className={styles.itemDate}>
                {dateObj.getMonth() + 1}/{dateObj.getDate()}
              </span>
              <span className={styles.itemWeek}>
                {item.weekday.toUpperCase()}
              </span>
            </div>
            {item.startTime && item.endTime ? (
              <div className={styles.scheduleTime}>
                <span>{item.startTime}</span>
                <span>{item.endTime}</span>
              </div>
            ) : item.scheduleStatus ? (
              <p className={styles.scheduleStatus}>{item.scheduleStatus}</p>
            ) : (
              <span className={styles.noData}>ー</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
