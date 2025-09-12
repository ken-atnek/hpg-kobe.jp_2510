/* =======================================
 * 店舗 ニュースページ コンポーネント
 * URL: src/components/Shop/PageNews.tsx
 * Referenced in:  src/app/hot/system/page.tsx
 * Created: 2025-09-11
 * Last updated: 2025-09-11
 * ======================================= */
'use client';

import styles from '@/styles/components/ShopNews.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { convertRemToPx } from '@/lib/convertRemToPx';
import { convertFontToSpan } from '@/lib/cleanHtml';

type ContentsProps = {
  jsonPath: string;
};

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

const PageNews = ({ jsonPath }: ContentsProps) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // ニュースデータは常にキャッシュバスティング
        const timestamp = Date.now();
        const dataPath = `${jsonPath}?t=${timestamp}`;

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: NewsItem[] = await response.json();
        setNewsItems(data);
      } catch (error) {
        console.error('ニュースデータの取得エラー:', error);
      }
    };

    fetchNewsData();
  }, [jsonPath]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // 少し待ってから実行（DOM描画完了を待つ）
      }
    }
  }, [newsItems]);

  return (
    <ul className={styles.pageListNews}>
      {newsItems
        .filter((item) => item.active)
        .slice(0, 10) // 表示件数を10件に制限
        .map((item) => (
          <li key={item.id} id={`news-${item.id}`} className={styles.itemNews}>
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
              <div
                className={styles.itemBOdy}
                dangerouslySetInnerHTML={{
                  __html: convertFontToSpan(convertRemToPx(item.body, 14)),
                }}
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default PageNews;
