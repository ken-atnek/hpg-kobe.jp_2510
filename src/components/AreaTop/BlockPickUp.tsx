/* =======================================
 * 神戸ホットポイントグループ ピックアップ
 * URL: src/components/AreaTop/BlockPickUp.tsx
 * Referenced in: /app/page.tsx
 * Created: 2025-08-19
 * Last updated: 2025-09-12
 * ======================================= */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/AreaTop.module.scss';
import type { CastDetail } from '@/types/CastDetails';
// Swiper関連のインポート
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BlockPickUp = () => {
  const [grouped, setGrouped] = useState<{
    hot: CastDetail[];
    villa: CastDetail[];
  } | null>(null);

  const [allCasts, setAllCasts] = useState<CastDetail[]>([]);

  const [activeIndices, setActiveIndices] = useState<{
    [key in 'hot' | 'villa']: number;
  }>({
    hot: 0,
    villa: 0,
  });

  // データ取得
  useEffect(() => {
    let cancelled = false;

    const fetchPickUpData = async () => {
      try {
        const timestamp =
          process.env.NODE_ENV === 'development' ? Date.now() : '';
        const dataPath = `/data/area-top/areaTopPickUp.json${timestamp ? `?t=${timestamp}` : ''}`;

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CastDetail[] = await response.json();
        if (cancelled) return;

        const grouped = {
          hot: data.filter((item) => item.shopId === 'hot'),
          villa: data.filter((item) => item.shopId === 'villa'),
        };
        setGrouped(grouped);
        setAllCasts(data); // 全キャストデータもセット
      } catch (error) {
        console.error('PickUpデータの取得エラー:', error);
      }
    };

    fetchPickUpData();

    return () => {
      cancelled = true;
    };
  }, []);

  // PC版のインターバル処理（既存のまま）
  useEffect(() => {
    if (!grouped) return;

    const timers: NodeJS.Timeout[] = [];

    let delay = 0;
    (['hot', 'villa'] as const).forEach((shop) => {
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

  // キャストカードを生成する共通関数
  const renderCastCard = (cast: CastDetail) => (
    <Link
      key={cast.castId}
      href={`/${cast.shopId}/profile/?id=${cast.castId}`}
      className={styles.wrapLink}
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
  );

  return (
    <>
      {/* PC版（既存のフェード表示） */}
      <ul className={`${styles.blockPickUp} ${styles.pcVersion}`}>
        {(['hot', 'villa'] as const).map((shop) => {
          if (!grouped || !grouped[shop] || grouped[shop].length === 0)
            return <li key={shop}></li>;
          const activeIndex = activeIndices[shop];
          return (
            <li key={shop}>
              <div className={styles.fadeStage}>
                {grouped[shop].map((cast, idx) => (
                  <Link
                    key={cast.castId}
                    href={`/${shop}/profile/?id=${cast.castId}`}
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

      {/* スマホ版（Swiperスライド表示） */}
      <div className={styles.mobileBlockPickUp}>
        {allCasts.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            loop={true} // 無限ループを有効化
            speed={1000}
            style={
              {
                '--swiper-transition-timing-function':
                  'cubic-bezier(0.25, 0.1, 0.25, 1)',
              } as React.CSSProperties
            }
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className={styles.castSwiper}
          >
            {allCasts.map((cast) => (
              <SwiperSlide key={cast.castId}>
                {renderCastCard(cast)}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default BlockPickUp;
