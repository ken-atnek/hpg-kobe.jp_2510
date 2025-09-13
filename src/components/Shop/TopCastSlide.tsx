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

type CastSlideItem = {
  category: number;
  castId: string;
  castName: string;
  castImage: string;
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

  const [castData, setCastData] = useState<
    {
      category: number;
      castId: string;
      castName: string;
      castImage: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCastData = async () => {
      try {
        // キャッシュバスティング設定（開発環境のみ）
        const timestamp =
          process.env.NODE_ENV === 'development' ? Date.now() : '';
        const dataPath = `${jsonPath}${timestamp ? `?t=${timestamp}` : ''}`;

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CastSlideItem[] = await response.json();
        setCastData(data);
      } catch (error) {
        console.error('キャストデータの取得エラー:', error);
        setCastData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCastData();
  }, [jsonPath]);

  // データが空またはロード中の場合は非表示
  if (isLoading || castData.length === 0) {
    return null;
  }

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
          {[...castData, ...castData].map((cast, index) => (
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
