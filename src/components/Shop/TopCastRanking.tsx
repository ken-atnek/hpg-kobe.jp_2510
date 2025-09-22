/* =======================================
 *店舗 TOP キャストランキング
 * URL: src/components/Shop/TopCastRanking.tsx
 * Referenced in: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-23
 * Last updated: 2025-09-11
 * ======================================= */
import styles from '@/styles/components/ShopTopCastRanking.module.scss';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { CastDetail } from '@/types/CastDetails';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';
type Ranking = {
  titleId: string;
  title: string;
  casts: CastDetail[];
};

type ContentsProps = {
  titleJp?: string;
  titleEn?: string;
  titleEnSub?: string;
  jsonPath: string;
};

const CastRanking = ({
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

  const [rankingData, setRankingData] = useState<Ranking[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => setRankingData(data))
      .catch(() => {
        // エラー時の処理（何もしない）
      });
  }, [jsonPath]);

  const selectedRanking = useMemo(() => {
    return rankingData[selectedIndex] || { casts: [] };
  }, [rankingData, selectedIndex]);

  const listHead = selectedRanking.casts.slice(0, 3); // Rank 1〜3
  const listMiddle = selectedRanking.casts.slice(3, 5); // Rank 4〜5

  const [isFading, setIsFading] = useState(false);
  const handleRankingChange = (index: number) => {
    setIsFading(true);
    setTimeout(() => {
      setSelectedIndex(index);
      setIsFading(false);
    }, 200); // 300ms だけフェード時間
  };

  // 表示キャスト順を sessionStorage にランキング種別ごとに保存
  useEffect(() => {
    if (selectedRanking?.casts?.length && rankingData[selectedIndex]?.titleId) {
      const castOrder = selectedRanking.casts.map((c) => ({
        id: c.castId,
        name: c.castName,
      }));
      // ランキング種別ごとに保存
      sessionStorage.setItem(
        `castOrder_ranking_${rankingData[selectedIndex].titleId}`,
        JSON.stringify(castOrder)
      );
    }
  }, [selectedRanking, rankingData, selectedIndex]);

  return (
    <article className={clsx(styles.boxCastRanking, styles[activeStoreClass])}>
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
      <div className={styles.rankingContents}>
        <nav className={styles['len' + rankingData.length]}>
          {rankingData.map((item, index) => (
            <button
              key={item.titleId}
              className={
                index === selectedIndex ? styles.isActive : styles.style
              }
              onClick={() => handleRankingChange(index)}
            >
              <span>{item.title}</span>
            </button>
          ))}
        </nav>
        <div className={clsx(styles.wrapRankList, { [styles.fade]: isFading })}>
          <ul className={styles.listHead}>
            {listHead.map((cast) => (
              <li key={cast.castId}>
                <div
                  className={clsx(styles.rankIcon, styles['rank' + cast.rank])}
                >
                  <span>No.{cast.rank}</span>
                </div>
                {/* type=ranking & rankingType=titleId を付与 */}
                <Link
                  href={`/${shop}/profile/?id=${cast.castId}&type=ranking&rankingType=${rankingData[selectedIndex]?.titleId}`}
                >
                  <Image
                    src={
                      cast.castImage && cast.castImage !== ''
                        ? cast.castImage
                        : `/images/cast/${shop}/no-image.webp`
                    }
                    alt={cast.castName}
                    fill
                  />
                </Link>
                <div className={styles.textProfile}>
                  <p className={styles.castName}>{cast.castName}</p>
                  <div className={styles.sizeHead}>
                    <span className={styles.age}>{cast.age}</span>
                    <span className={styles.cup}>{cast.cup}</span>
                  </div>
                  <div className={styles.size}>
                    <span className={styles.tall}>{cast.tall}</span>
                    <span className={styles.bust}>{cast.bust}</span>
                    <span className={styles.west}>{cast.west}</span>
                    <span className={styles.hip}>{cast.hip}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <ul className={styles.listMiddle}>
            {listMiddle.map((cast) => (
              <li key={cast.castId}>
                <div
                  className={clsx(styles.rankIcon, styles['rank' + cast.rank])}
                >
                  <span>No.{cast.rank}</span>
                </div>
                {/* type=ranking & rankingType=titleId を付与 */}
                <Link
                  href={`/${shop}/profile/?id=${cast.castId}&type=ranking&rankingType=${rankingData[selectedIndex]?.titleId}`}
                >
                  <Image
                    src={
                      cast.castImage && cast.castImage !== ''
                        ? cast.castImage
                        : `/images/cast/${shop}/no-image.webp`
                    }
                    alt={cast.castName}
                    width={130}
                    height={170}
                  />
                </Link>
                <div className={styles.textProfile}>
                  <p className={styles.castName}>{cast.castName}</p>
                  <div className={styles.sizeHead}>
                    <span className={styles.age}>{cast.age}</span>
                    <span className={styles.cup}>{cast.cup}</span>
                  </div>
                  <div className={styles.size}>
                    <span className={styles.tall}>{cast.tall}</span>
                    <span className={styles.bust}>{cast.bust}</span>
                    <span className={styles.west}>{cast.west}</span>
                    <span className={styles.hip}>{cast.hip}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};
export default CastRanking;
