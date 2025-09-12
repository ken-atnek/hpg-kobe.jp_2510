/* =======================================
 * 神戸ホットポイントグループ NEW FACE
 * URL:src/components/AreaTop/BlockNewFace.tsx
 * Referenced in: /app/page.tsx
 * Created: 2025-08-19
 * Last updated: 2025-08-19
 * ======================================= */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/AreaTop.module.scss';
import type { CastDetail } from '@/types/CastDetails';

const BlockNewFace = () => {
  const [grouped, setGrouped] = useState<{
    hot: CastDetail[];
    villa: CastDetail[];
  } | null>(null);

  const [activeIndices, setActiveIndices] = useState<{
    [key in 'hot' | 'villa']: number;
  }>({
    hot: 0,
    villa: 0,
  });

  // データ取得
  useEffect(() => {
    let cancelled = false;
    fetch('/data/area-top/areaTopNewFace.json')
      .then((res) => res.json())
      .then((data: CastDetail[]) => {
        if (cancelled) return;
        const grouped = {
          hot: data.filter((item) => item.shopId === 'hot'),
          villa: data.filter((item) => item.shopId === 'villa'),
        };
        setGrouped(grouped);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // インターバルでインデックス切り替え
  useEffect(() => {
    if (!grouped) return;

    const timers: NodeJS.Timeout[] = [];

    let delay = 0;
    (['hot', 'villa'] as const).forEach((shop) => {
      const timer = setTimeout(() => {
        setInterval(() => {
          setActiveIndices((prev) => {
            const list = grouped[shop];
            if (!list || list.length === 0) return prev;
            const nextIndex = (prev[shop] + 1) % list.length;
            return { ...prev, [shop]: nextIndex };
          });
        }, 6000);
      }, delay);
      delay += 300;
      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [grouped]);

  return (
    <ul className={styles.blockNewFace}>
      {(['hot', 'villa'] as const).map((shop) => {
        if (!grouped || !grouped[shop] || grouped[shop].length === 0)
          return <li key={shop}></li>;
        const activeIndex = activeIndices[shop];
        return (
          <li key={shop} className={styles[shop]}>
            <div className={styles.fadeStage}>
              {grouped[shop].map((cast, idx) => (
                <Link
                  key={cast.castId}
                  href={`/${shop}/profile/?id=${cast.castId}`}
                  className={`${styles.wrapLink} ${styles.fadeItem} ${
                    idx === activeIndex ? styles.isActive : ''
                  }`}
                  aria-hidden={idx !== activeIndex}
                  tabIndex={idx === activeIndex ? 0 : -1}
                >
                  <div className={styles.wrapImage}>
                    <Image
                      key={cast.castId}
                      src={cast.castImage}
                      alt={cast.castName}
                      width={120}
                      height={160}
                    />
                  </div>
                  <div className={styles.wrapProfile}>
                    <div className={styles.castName}>{cast.castName}</div>
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
                </Link>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default BlockNewFace;
