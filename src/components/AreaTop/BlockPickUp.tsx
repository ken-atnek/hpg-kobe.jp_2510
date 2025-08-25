/* =======================================
 * 神戸ホットポイントグループ ピックアップ
 * URL: src/components/AreaTop/BlockPickUp.tsx
 * Referenced in: /app/page.tsx
 * Created: 2025-08-19
 * Last updated: 2025-08-19
 * ======================================= */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/AreaTop.module.scss';

// JSON の型
export type PickUpItem = {
  castId: string;
  castName: string;
  shopId: 'hot' | 'style' | 'villa';
  shopName: string;
  castImage: string;
  age: string;
  tall: string;
  bust: string;
  cup: string;
  west: string;
  hip: string;
  castUrl: string;
};

const BlockPickUp = () => {
  const [grouped, setGrouped] = useState<{
    hot: PickUpItem[];
    style: PickUpItem[];
    villa: PickUpItem[];
  } | null>(null);

  const [activeIndices, setActiveIndices] = useState<{
    [key in 'hot' | 'style' | 'villa']: number;
  }>({
    hot: 0,
    style: 0,
    villa: 0,
  });

  // データ取得
  useEffect(() => {
    let cancelled = false;
    fetch('/data/area-top/areaTopPickUp.json')
      .then((res) => res.json())
      .then((data: PickUpItem[]) => {
        if (cancelled) return;
        const grouped = {
          hot: data.filter((item) => item.shopId === 'hot'),
          style: data.filter((item) => item.shopId === 'style'),
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
    (['hot', 'style', 'villa'] as const).forEach((shop) => {
      const timer = setTimeout(() => {
        setInterval(() => {
          setActiveIndices((prev) => {
            const list = grouped[shop];
            if (!list || list.length === 0) return prev;
            const nextIndex = (prev[shop] + 1) % list.length;
            return { ...prev, [shop]: nextIndex };
          });
        }, 4000);
      }, delay);
      delay += 200;
      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [grouped]);

  return (
    <ul className={styles.blockPickUp}>
      {(['hot', 'style', 'villa'] as const).map((shop) => {
        if (!grouped || !grouped[shop] || grouped[shop].length === 0)
          return <li key={shop}></li>;
        const activeIndex = activeIndices[shop];
        return (
          <li key={shop}>
            <div className={styles.fadeStage}>
              {grouped[shop].map((cast, idx) => (
                <Link
                  key={cast.castId}
                  href={cast.castUrl}
                  className={`${styles.wrapLink} ${styles.fadeItem} ${
                    idx === activeIndex ? styles.isActive : ''
                  }`}
                  aria-hidden={idx !== activeIndex}
                  tabIndex={idx === activeIndex ? 0 : -1}
                >
                  <div className={styles.shopName}>{cast.shopName}</div>
                  <div className={styles.wrapImage}>
                    <Image
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

export default BlockPickUp;
