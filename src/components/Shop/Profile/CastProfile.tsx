/* =======================================
 *店舗  キャストプロフィール
 * URL: src/components/Shop/Profile/CastProfile.tsx
 * Referenced in: src/app/hot/profile/page.tsx
 * Created: 2025-09-06
 * Last updated: 2025-09-06
 * ======================================= */
'use client';

import styles from '@/styles/ShopCastProfile.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { gradeMap } from '@/constants/castGradeMap';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';
import type { CastDetail } from '@/types/CastDetails';
import ProfileContainerHead from '@/components/Shop/Profile/ProfileContainerHead';

export default function CastProfile() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const castId = searchParams.get('id');
  const [cast, setCast] = useState<CastDetail | null>(null);
  const [error, setError] = useState(false);

  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);

  useEffect(() => {
    if (cast) {
      document.title = `${cast.castName}さんのプロフィール | 神戸ホットポイント`;

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: cast.castName,
        description: `${cast.age}歳 / ${cast.tall}cm / ${cast.bust}-${cast.west}-${cast.hip} (${cast.cup})`,
        image: cast.castImage,
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      script.id = 'structured-data-cast';

      const existing = document.getElementById('structured-data-cast');
      if (existing) {
        existing.remove();
      }

      document.head.appendChild(script);
    }
  }, [cast]);

  useEffect(() => {
    if (!castId) return;

    fetch(`/cast/${shop}/${castId}/details.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Not Found');
        return res.json();
      })
      .then((data) => {
        setCast(data);
        setError(false);
      })
      .catch(() => {
        setCast(null);
        setError(true);
      });
  }, [castId, shop]);

  if (!castId) return <p>キャストIDが指定されていません。</p>;
  if (error) return <p>キャスト情報が見つかりません。</p>;
  if (!cast) return <p>読み込み中...</p>;

  const gradeClassName =
    cast.gradeId && gradeMap[cast.gradeId]
      ? gradeMap[cast.gradeId].className
      : '';

  return (
    <>
      <ProfileContainerHead />
      <section
        className={clsx(styles.containerContents, styles[activeStoreClass])}
      >
        <div
          className={clsx(
            styles.itemHeadImage,
            gradeClassName && styles[gradeClassName]
          )}
        >
          {cast.gradeId >= 1 && cast.gradeId <= 8 && (
            <div className={styles.gradeFrame}></div>
          )}
          <Image
            src={
              cast.profileImages && cast.profileImages.length > 0
                ? cast.profileImages[0]
                : `/images/cast/${shop}/no-image.webp`
            }
            alt={`${cast.castName}の画像1`}
            width={580}
            height={773}
          />
        </div>
        <div className={styles.boxProfile}>
          <h1>{cast.castName}さんのプロフィール</h1>
          <p>年齢：{cast.age}</p>
          <p>身長：{cast.tall}cm</p>
          <p>
            スリーサイズ：{cast.bust}-{cast.west}-{cast.hip}（{cast.cup}カップ）
          </p>
        </div>
      </section>
    </>
  );
}
