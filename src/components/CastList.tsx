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
import { useEffect, useMemo, useState } from 'react';
import type { CastDetail } from '@/types/CastDetails';
import ItemCastList from './Shop/ItemCastList';
import { gradeMap } from '@/constants/castGradeMap';
type CastGroup = {
  rank: string;
  casts: CastDetail[];
};

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

const filters = [
  { id: 'today', label: '本日出勤' },
  { id: 'age', label: '年齢' },
  { id: 'height', label: '身長' },
  { id: 'cup', label: 'カップ' },
  { id: 'new', label: '新人' },
];

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
    const path = pathname.split('/')[1]; // 例: "hot", "villa"
    const jsonPath = `/data/${path}/CastList.json`;

    fetch(jsonPath)
      .then((res) => res.json())
      .then((data: CastDetail[]) => {
        const grouped = groupByGrade(data);
        setCastGroups(grouped);
      });
  }, [pathname]);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortTrigger, setSortTrigger] = useState(0); // ソートトリガー
  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    setSortTrigger((prev) => prev + 1); // トリガーを更新
  };

  const filteredGroups = useMemo(() => {
    if (activeFilter === 'today') {
      const allCasts = castGroups.flatMap((group) => group.casts);
      const filteredCasts = allCasts.filter(
        (cast) => cast.scheduleStatus || cast.startTime || cast.endTime
      );
      return [{ rank: '', casts: filteredCasts }];
    } else if (activeFilter === 'new') {
      const allCasts = castGroups.flatMap((group) => group.casts);
      const filteredCasts = allCasts.filter(
        (cast) => cast.badges?.includes('new') || cast.badges?.includes('trial')
      );
      return [{ rank: '', casts: filteredCasts }];
    } else if (['age', 'height', 'cup'].includes(activeFilter ?? '')) {
      const allCasts = castGroups.flatMap((group) => group.casts);

      const sortedCasts = [...allCasts].sort((a, b) => {
        switch (activeFilter) {
          case 'age':
            return a.age - b.age;
          case 'height':
            return a.tall - b.tall;
          case 'cup': {
            const cupOrder = [
              'a',
              'b',
              'c',
              'd',
              'e',
              'f',
              'g',
              'h',
              'i',
              'j',
              'k',
            ];
            const aCup = (a.cup || '').toLowerCase();
            const bCup = (b.cup || '').toLowerCase();
            const aIndex = cupOrder.indexOf(aCup);
            const bIndex = cupOrder.indexOf(bCup);
            const safeA = aIndex === -1 ? 999 : aIndex;
            const safeB = bIndex === -1 ? 999 : bIndex;
            return safeB - safeA;
          }
        }
        return 0;
      });

      return [{ rank: '', casts: sortedCasts }];
    }

    return castGroups;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, castGroups, sortTrigger]);

  return (
    <>
      <section
        className={clsx(styles.containerSearch, styles[activeStoreClass])}
      >
        <h3>more search</h3>
        <ul className={styles.filterList}>
          {filters.map((filter) => (
            <li key={filter.id}>
              <button
                type="button"
                className={clsx(styles.filterBtn, {
                  [styles.isActive]: activeFilter === filter.id,
                })}
                onClick={() => handleFilterClick(filter.id)}
              >
                {filter.label.split('').map((char, index) => (
                  <i key={index}>{char}</i>
                ))}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className={clsx(styles.btnReset, {
                [styles.isActive]: activeFilter === null,
              })}
              onClick={() => setActiveFilter(null)}
            >
              リセット
            </button>
          </li>
        </ul>
      </section>
      <section className={clsx(styles.containerList, styles[activeStoreClass])}>
        {activeFilter === null ? (
          filteredGroups.map((group) => (
            <article
              key={group.rank}
              className={clsx(
                styles.groupBlock,
                styles[gradeMap[group.casts[0]?.gradeId]?.className ?? '']
              )}
            >
              <h2 className={styles.rankTitle}>{group.rank}</h2>
              <ul className={styles.castList}>
                {group.casts.map((cast) => (
                  <ItemCastList key={cast.castId} cast={cast} />
                ))}
              </ul>
            </article>
          ))
        ) : (
          <ul className={styles.castList}>
            {filteredGroups[0]?.casts.map((cast) => (
              <ItemCastList key={cast.castId} cast={cast} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default CastList;
