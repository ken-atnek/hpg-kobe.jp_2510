/* =======================================
 * キャスト一覧 コンポーネント
 * URL:src/components/CastList.tsx
 * Referenced in: : src/app/hot/cast/page.tsx
 * Created: 2025-09-02
 * Last updated: 2025-09-02
 * ======================================= */
'use client';
import styles from '@/styles/ShopCastList.module.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type { CastDetail } from '@/types/CastDetails';
import Link from 'next/link';
import Image from 'next/image';
import { gradeMap } from '@/constants/castGradeMap';
import { typeLabels } from '@/constants/castTypeLabels';
type CastGroup = {
  rank: string;
  casts: CastDetail[];
};

function getTypeLabels(typeArray: number[]): string[] {
  return typeArray.map((type) => typeLabels[type]).filter(Boolean);
}

function groupByGrade(casts: CastDetail[]): CastGroup[] {
  const map = new Map<string, CastDetail[]>();

  casts.forEach((cast) => {
    const label = gradeMap[cast.gradeId]?.label ?? '未設定';
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(cast);
  });

  return Array.from(map.entries()).map(([label, casts]) => ({
    rank: label,
    casts,
  }));
}

const CastList = () => {
  const pathname = usePathname();
  const path = pathname.split('/')[1];

  const storeIdMap: Record<string, string> = {
    hot: 'kbHot',
    villa: 'kbVilla',
  };
  const activeStoreClass = storeIdMap[path];

  const [castGroups, setCastGroups] = useState<CastGroup[]>([]);

  useEffect(() => {
    fetch('/data/hot/CastList.json')
      .then((res) => res.json())
      .then((data: CastDetail[]) => {
        const grouped = groupByGrade(data);
        setCastGroups(grouped);
      });
  }, []);

  return (
    <>
      <section
        className={clsx(styles.containerSearch, styles[activeStoreClass])}
      ></section>
      <section className={clsx(styles.containerList, styles[activeStoreClass])}>
        {castGroups.map((group) => (
          <article
            key={group.rank}
            className={clsx(
              styles.groupBlock,
              styles[gradeMap[group.casts[0].gradeId]?.className ?? '']
            )}
          >
            <h2 className={styles.rankTitle}>{group.rank}</h2>
            <ul className={styles.castList}>
              {group.casts.map((cast) => {
                const gradeClassName = gradeMap[cast.gradeId]?.className;

                return (
                  <li key={cast.castId} className={styles.boxCast}>
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
                    <ul className={styles.listType}>
                      {cast.type.map((typeId, i) => {
                        const label = typeLabels[typeId];
                        return label ? <li key={i}>{label}</li> : null;
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
};

export default CastList;
