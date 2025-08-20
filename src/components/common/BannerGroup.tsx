/* =======================================
 * 共通バナーグループコンポーネント
 * - エリア・店舗・イベント等のLEFTバナー表示に対応
 * URL: src/components/common/BannerGroup.tsx
 * Usage: src/app/page.tsx 他
 * Created: 2025-08-20
 * Last updated: 2025-08-20
 * ======================================= */

'use client';
import styles from '@/styles/AreaTop.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type BannerItem = {
  banId: string;
  banTitle: string;
  banImage: string;
  link: boolean;
  linkUrl: string;
  linkTarget?: boolean;
  popUp?: boolean;
  popUpImage?: string;
};

type Props = {
  jsonPath: string;
  title?: string;
  className?: string;
};

const BannerGroup = ({ jsonPath, title, className }: Props) => {
  const [items, setItems] = useState<BannerItem[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data: BannerItem[]) => setItems(data))
      .catch((err) => console.error('バナー取得失敗:', err));
  }, [jsonPath]);

  return (
    <div className={clsx(styles.boxBanGroup, className)}>
      {title && <h3>{title}</h3>}
      <ul>
        {items.map((item) => (
          <li key={item.banId}>
            {item.link ? (
              <a
                href={item.linkUrl}
                target={item.linkTarget ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={styles.itemBan}
              >
                <Image
                  src={item.banImage}
                  alt={item.banTitle}
                  width={325}
                  height={119}
                />
              </a>
            ) : item.popUp && item.popUpImage ? (
              <button
                onClick={() => setModalImage(item.popUpImage!)}
                className={styles.itemBan}
                style={{ all: 'unset', cursor: 'pointer' }}
              >
                <Image
                  src={item.banImage}
                  alt={item.banTitle}
                  width={325}
                  height={119}
                />
              </button>
            ) : (
              <div className={styles.itemBan}>
                <Image
                  src={item.banImage}
                  alt={item.banTitle}
                  width={325}
                  height={119}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      {modalImage && (
        <div
          className={styles.modalOverlay}
          onClick={() => setModalImage(null)}
        >
          <div className={styles.modalContent}>
            <Image
              src={modalImage}
              alt="ポップアップ画像"
              width={650}
              height={238}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerGroup;
