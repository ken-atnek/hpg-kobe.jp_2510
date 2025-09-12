/* =======================================
 * 神戸ホットポイントグループ 相互リンク
 * URL: src/components/Entrance/ReciprocalLink.tsx
 * Referenced in: src/components/Entrance/Entrance.tsx
 * Created: 2025-08-18
 * Last updated: 2025-09-12
 * ======================================= */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/Entrance.module.scss';
import clsx from 'clsx';
// 相互リンクの型定義
type ReciprocalLinkItem = {
  banId: string;
  status: boolean;
  name: string;
  url?: string;
  thumbnail?: string;
  body?: string;
};

type ReciprocalLinkBlock = {
  blockId: string;
  status: boolean;
  list: ReciprocalLinkItem[];
};

const ReciprocalLink = () => {
  const pathname = usePathname();
  const [reciprocalData, setReciprocalData] = useState<ReciprocalLinkBlock[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getDataPath = useCallback(() => {
    if (pathname.startsWith('/hot')) {
      return '/data/hot/ReciprocalLink.json';
    } else if (pathname.startsWith('/villa')) {
      return '/data/villa/ReciprocalLink.json';
    }
    return '/data/area-top/ReciprocalLink.json';
  }, [pathname]);

  useEffect(() => {
    const fetchReciprocalLinks = async () => {
      try {
        const dataPath = getDataPath();

        const response = await fetch(dataPath);

        if (!response.ok) {
          // 404エラーの場合はデフォルトファイルを試行
          if (
            response.status === 404 &&
            dataPath !== '/data/area-top/ReciprocalLink.json'
          ) {
            const fallbackResponse = await fetch(
              '/data/area-top/ReciprocalLink.json'
            );
            if (!fallbackResponse.ok) {
              throw new Error(
                `デフォルトファイルも見つかりません: ${fallbackResponse.status}`
              );
            }
            const fallbackText = await fallbackResponse.text();
            const fallbackData: ReciprocalLinkBlock[] =
              JSON.parse(fallbackText);
            const activeBlocks = fallbackData.filter((block) => block.status);
            setReciprocalData(activeBlocks);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const data: ReciprocalLinkBlock[] = JSON.parse(text);
        const activeBlocks = data.filter((block) => block.status);
        setReciprocalData(activeBlocks);
      } catch (err) {
        console.error('相互リンクデータの取得エラー:', err);
        setError(
          err instanceof Error ? err.message : '不明なエラーが発生しました'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReciprocalLinks();
  }, [getDataPath]);

  const renderLinkItem = (item: ReciprocalLinkItem) => {
    // statusがfalseの場合は非表示
    if (!item.status) return null;

    // bodyがある場合はHTMLをそのまま表示
    if (item.body) {
      return (
        <div
          key={item.banId}
          className={styles.reciprocalItem}
          dangerouslySetInnerHTML={{ __html: item.body }}
        />
      );
    }

    // 通常のリンク表示
    if (item.url) {
      return (
        <li key={item.banId} className={styles.reciprocalItem}>
          <div className={styles.reciprocalLink}>
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={item.name}
                width={236}
                height={68}
                className={styles.reciprocalThumbnail}
              />
            )}
          </div>
        </li>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <article className={styles.boxReciprocalLink}>
        <div className={styles.loading}>読み込み中...</div>
      </article>
    );
  }

  if (error) {
    return (
      <article className={styles.boxReciprocalLink}>
        <div className={styles.error}>エラー: {error}</div>
      </article>
    );
  }

  return (
    <article className={styles.boxReciprocalLink}>
      {reciprocalData.map((block) => (
        <ul
          key={block.blockId}
          className={clsx(
            styles.reciprocalBlock,
            styles[`reciprocalBlock--${block.blockId}`]
          )}
        >
          {block.list.map(renderLinkItem)}
        </ul>
      ))}
    </article>
  );
};

export default ReciprocalLink;
