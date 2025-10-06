/* =======================================
 * 出勤情報日別 コンポーネント
 * URL:src/components/Shop/schedule/CastScheduleByDay.tsx
 * Referenced in: :src/app/hot/weekly-schedule/page.tsx
 * Created: 2025-09-01
 * Last updated: 2025-09-11
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
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';
import ShopSwitchTabs from '@/components/common/ShopSwitchTabs';

type ScheduleData = {
  date: string;
  casts: CastDetail[];
};

const CastScheduleByDay = () => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);

  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 日付に対応するスケジュールを取得
  const dailyScheduleList = schedules.find((s) => s.date === selectedDate);

  // スケジュールの読み込み
  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const config = await loadScheduleConfig(shop);
        const dateList = getDateList(config.switchHour, config.days);
        const basePath = `/data/${shop}/schedule`;

        // スケジュールデータは常にキャッシュバスティング
        const timestamp = Date.now();
        const timestampParam = `?t=${timestamp}`;

        const fetched = await Promise.all(
          dateList.map(async (date) => {
            const response = await fetch(
              `${basePath}/${date}.json${timestampParam}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            return json as ScheduleData;
          })
        );

        setSchedules(fetched);
      } catch {}
    };

    loadSchedules();
  }, [shop]);

  // 初回ロード時、最初の日付を自動で選択
  useEffect(() => {
    if (schedules.length > 0 && !selectedDate) {
      setSelectedDate(schedules[0].date);
    }
  }, [schedules, selectedDate]);

  // 表示キャスト順を sessionStorage に保存
  useEffect(() => {
    if (dailyScheduleList?.casts?.length) {
      const castOrder = dailyScheduleList.casts.map((c) => ({
        id: c.castId,
        name: c.castName,
      }));
      // 修正: 用途ごとにキーを分ける
      sessionStorage.setItem(
        'castOrder_schedulebyday',
        JSON.stringify(castOrder)
      );
    }
  }, [dailyScheduleList]);
  return (
    <>
      <section className={clsx(styles.containerHead, styles[activeStoreClass])}>
        <Link
          href={`/${shop}/weekly-schedule/`}
          className={styles.linkByPeriod}
        >
          一覧表示はコチラ
        </Link>

        {/* 店舗切替タブ */}
        <ShopSwitchTabs basePath="schedule" variant="schedule" />
      </section>

      <section
        className={clsx(styles.containerContents, styles[activeStoreClass])}
      >
        <article className={styles.blockByDay}>
          {/* 日付タブ */}
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

          {/* キャスト一覧 */}
          {dailyScheduleList && (
            <ul
              className={clsx(styles.castList, {
                [styles.isToday]: selectedDate === schedules[0]?.date,
              })}
            >
              {dailyScheduleList.casts.map((cast) => {
                const gradeClassName = gradeMap[cast.gradeId]?.className;
                return (
                  <li key={cast.castId} className={styles.castItem}>
                    {/* リアルタイム状態 */}
                    {cast.realTimeStatus ? (
                      <div
                        className={`${styles.realTImeDetail} ${
                          [3, 4, 5].includes(cast.realTimeStatus)
                            ? styles.statusNa
                            : ''
                        }`}
                      >
                        {cast.realTimeDetail}
                      </div>
                    ) : (
                      <div className={styles.realTImeNoDetail} />
                    )}

                    {/* 出勤時間またはステータス */}
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

                    {/* キャストリンク */}
                    <Link
                      href={`/${shop}/profile/?id=${cast.castId}&type=schedulebyday`}
                    >
                      {/* バッジ表示 */}
                      <div className={styles.wrapBadge}>
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
                            新人
                            <br />
                            さん
                          </span>
                        ) : null}

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

                      {/* 画像・グレード */}
                      <div
                        className={`${styles.wrapPhoto} ${gradeClassName ? styles[gradeClassName] : ''}`}
                      >
                        {cast.gradeId &&
                          cast.gradeId >= 1 &&
                          cast.gradeId <= 8 && (
                            <div className={styles.gradeFrame}></div>
                          )}
                        <span className={styles.gradeLabel}>
                          {gradeMap[cast.gradeId]?.label}
                        </span>
                        <Image
                          src={
                            cast.castImage && cast.castImage !== ''
                              ? cast.castImage
                              : `/images/cast/${shop}/no-image.webp`
                          }
                          alt={cast.castName}
                          fill
                        />
                      </div>
                    </Link>

                    {/* プロフィール情報 */}
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
