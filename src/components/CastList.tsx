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

  const [castGroups, setCastGroups] = useState<{ rank: string; casts: CastDetail[]; }[]>([]);

  useEffect(() => {
    const path = pathname.split('/')[1]; // 例: "hot", "villa"
    const jsonPath = `/data/${path}/CastList.json`;

    fetch(jsonPath)
      .then((res) => res.json())
      .then((data: CastDetail[]) => {
        setCastGroups([{ rank: '', casts: data }]);
      });
  }, [pathname]);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const displayCasts = useMemo(() => {
    const allCasts = castGroups.flatMap((group) => group.casts);

    let filtered = allCasts;
    if (activeFilter === 'today') {
      filtered = allCasts.filter(
        (cast) => cast.scheduleStatus || cast.startTime || cast.endTime
      );
    } else if (activeFilter === 'new') {
      filtered = allCasts.filter(
        (cast) =>
          cast.badges?.includes('new') || cast.badges?.includes('trial')
      );
    }

    switch (activeFilter) {
      case 'age':
        filtered.sort((a, b) => a.age - b.age);
        break;
      case 'height':
        filtered.sort((a, b) => a.tall - b.tall);
        break;
      case 'cup': {
        const cupOrder = ['a','b','c','d','e','f','g','h','i','j','k'];
        filtered.sort((a, b) => {
          const aIndex = cupOrder.indexOf((a.cup || '').toLowerCase());
          const bIndex = cupOrder.indexOf((b.cup || '').toLowerCase());
          const safeA = aIndex === -1 ? 999 : aIndex;
          const safeB = bIndex === -1 ? 999 : bIndex;
          return safeB - safeA;
        });
        break;
      }
      default:
        filtered.sort((a, b) => a.gradeId - b.gradeId);
        break;
    }

    return filtered;
  }, [activeFilter, castGroups]);

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
        <ul className={styles.castList}>
          {displayCasts.map((cast) => (
            <ItemCastList key={cast.castId} cast={cast} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default CastList;
