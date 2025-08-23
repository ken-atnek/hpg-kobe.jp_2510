/* =======================================
 *店舗 TOP キャストランキング
 * URL: src/components/Shop/TopCastSlide.tsx
 * Referenced in: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-23
 * Last updated: 2025-08-23
 * ======================================= */
import styles from '@/styles/components/ShopTopCastRanking.module.scss';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

type Cast = {
  rankID: string;
  rank: string;
  castId: string;
  castName: string;
  castImage: string;
  age: string;
  tall: string;
  bust: string;
  cup: string;
  west: string;
  hip: string;
  castUrl: string;
};

type Ranking = {
  titleId: string;
  title: string;
  casts: Cast[];
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
  const path = pathname.split('/')[1];

  const storeIdMap: Record<string, string> = {
    hot: 'kbHot',
    villa: 'kbVilla',
  };
  const storeNameMap: Record<string, string> = {
    hot: 'kobe hotpoint',
    villa: 'hotpoint villa',
  };
  const storeId = storeIdMap[path];
  const storeName = storeNameMap[path];

  const [rankingData, setRankingData] = useState<Ranking[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => setRankingData(data))
      .catch((err) => console.error('ランキングデータの取得失敗:', err));
  }, [jsonPath]);

  const selectedRanking = rankingData[selectedIndex] || { casts: [] };
  const listHead = selectedRanking.casts.slice(0, 3); // Rank 1〜3
  const listMiddle = selectedRanking.casts.slice(3, 5); // Rank 4〜5

  return (
    <div className={clsx(styles.boxCastRanking, styles[storeId])}>
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
              onClick={() => setSelectedIndex(index)}
            >
              <span>{item.title}</span>
            </button>
          ))}
        </nav>
        <div className={styles.wrapRankList}>
          <ul className={styles.listHead}>
            {listHead.map((cast) => (
              <li key={cast.castId}>
                <div
                  className={`${styles.rankIcon} ${styles['rank' + cast.rank]}`}
                >
                  <span>No.{cast.rank}</span>
                </div>
                <a href={cast.castUrl}>
                  <Image
                    src={cast.castImage}
                    alt={cast.castName}
                    width={130}
                    height={170}
                  />
                </a>
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
                  className={`${styles.rankIcon} ${styles['rank' + cast.rank]}`}
                >
                  <span>No.{cast.rank}</span>
                </div>
                <a href={cast.castUrl}>
                  <Image
                    src={cast.castImage}
                    alt={cast.castName}
                    width={130}
                    height={170}
                  />
                </a>
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
    </div>
  );
};
export default CastRanking;
