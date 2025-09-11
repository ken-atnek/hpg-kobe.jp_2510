/* =======================================
 *店舗 TOP NEWS
 * URL: src/components/Shop/TopNews.tsx
 * Referenced in: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-23
 * Last updated: 2025-08-26
 * ======================================= */
import styles from '@/styles/components/ShopNews.module.scss';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';

type NewsItem = {
  id: number;
  active: boolean;
  date: string;
  title: string;
  body: string;
  on_time?: number;
  off_time?: number;
  thumbnail: string;
};

type ContentsProps = {
  titleJp?: string;
  titleEn?: string;
  titleEnSub?: string;
  jsonPath: string;
};

const ShopNews = ({
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

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => setNewsItems(data))
      .catch((err) => console.error('ニュースデータの取得失敗:', err));
  }, [jsonPath]);

  // フィルタして表示対象を抽出
  const visibleItems = newsItems.filter((item) => {
    const now = Date.now() / 1000;
    return (
      item.active === true &&
      (!item.on_time || Number(item.on_time) <= now) &&
      (!item.off_time || Number(item.off_time) > now)
    );
  });

  // 表示する記事がない場合は非表示
  if (visibleItems.length === 0) return null;

  return (
    <article className={clsx(styles.boxTopNews, styles[activeStoreClass])}>
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
      <ul className={styles.listNews}>
        {visibleItems.slice(0, 2).map((item) => (
          <li key={item.id} className={styles.itemNews}>
            <div className={styles.wrapThumb}>
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={160}
                height={90}
              />
            </div>
            <div className={styles.wrapText}>
              <div className={styles.itemDate}>{item.date.slice(0, 16)}</div>
              <div className={styles.itemTitle}>{item.title}</div>
              <p>{item.body}</p>
              <Link href="/" className={styles.linkMore}>
                ＜もっと見る＞
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ShopNews;
