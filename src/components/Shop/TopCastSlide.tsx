'use client';
/* =======================================
 *店舗 TOP CAST SLIDE
 * URL: src/components/Shop/TopCastSlide.tsx
 * Referenced in: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-22
 * Last updated: 2025-09-11
 * ======================================= */
import styles from '@/styles/components/ShopTopCastSlide.module.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';

type ContentsProps = {
  titleJp?: string;
  titleEn?: string;
  titleEnSub?: string;
  jsonPath: string;
};

const CastSlide = ({
  titleJp,
  titleEn,
  titleEnSub,
  jsonPath,
}: ContentsProps) => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);

  const storeNameMap: Record<string, string> = {
    hot: 'kobe hotpoint',
    villa: 'hotpoint villa',
  };
  const storeName = storeNameMap[shop];

  const [casts, setCasts] = useState<
    {
      category: number;
      castId: string;
      castName: string;
      castImage: string;
      castUrl: string;
    }[]
  >([]);

  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => {
        setCasts([...data, ...data]);
      });
  }, [jsonPath]);

  return (
    <article className={clsx(styles.boxCastSlide, styles[activeStoreClass])}>
      <div className={styles.wrapTitle}>
        <h2>
          <span>
            {titleEn}
            <i>{titleEnSub}</i>
          </span>
          {titleJp}
        </h2>
      </div>
      <div className={styles.titleObject}>
        <div className={styles.wrapText}>
          <div className={styles.shopName}>{storeName}</div>
          <div className={styles.title}>
            {titleEn}
            <i>{titleEnSub}</i>
          </div>
        </div>
      </div>
      <div className={styles.wrapSlideList}>
        <div className={styles.slideTrack}>
          {[...casts, ...casts].map((cast, index) => (
            <div
              className={clsx(
                styles.itemCast,
                cast.category === 1 && styles.newFace,
                cast.category === 2 && styles.photoUp
              )}
              key={`${cast.castId}-${index}`}
            >
              <Link href={`/${shop}/profile/?id=${cast.castId}`}>
                <div className={styles.image}>
                  <Image
                    src={cast.castImage}
                    alt={cast.castName}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.castName}>{cast.castName}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
export default CastSlide;
