/* =======================================
 * 神戸ホットポイントグループ ピックアップ
 * URL: src/components/AreaTop/BlockPickUp.tsx
 * Referenced in: /app/page.tsx
 * Created: 2025-08-19
 * Last updated: 2026-01-21
 * ======================================= */

'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
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
  // villa の全件（SPのSwiperはこれを使う）
  const [villaCasts, setVillaCasts] = useState<CastDetail[]>([]);

  // PC左右の表示インデックス
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  // データ取得（villaのみ）
  useEffect(() => {
    let cancelled = false;

    const fetchPickUpData = async () => {
      try {
        const timestamp =
          process.env.NODE_ENV === 'development' ? Date.now() : '';
        const dataPath = `/data/area-top/areaTopPickUp.json${
          timestamp ? `?t=${timestamp}` : ''
        }`;

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CastDetail[] = await response.json();
        if (cancelled) return;

        const villaAll = data.filter((item) => item.shopId === 'villa');
        setVillaCasts(villaAll);

        // PCの初期表示（先頭＆最後）
        if (villaAll.length > 0) {
          setLeftIndex(0);
          setRightIndex(villaAll.length - 1);
        } else {
          setLeftIndex(0);
          setRightIndex(0);
        }
      } catch {
        // エラー時の処理（何もしない）
      }
    };

    fetchPickUpData();

    return () => {
      cancelled = true;
    };
  }, []);

  // PC版のインターバル処理（左：先頭→ / 右：最後←）
  useEffect(() => {
    const len = villaCasts.length;
    if (len === 0) return;

    const interval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % len);
      setRightIndex((prev) => (prev - 1 + len) % len);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [villaCasts]);

  // SP用：画像が無いキャストを除外（JSON順のまま）
  const filteredCasts = useMemo(
    () => villaCasts.filter((cast) => cast.castImage && cast.castImage !== ''),
    [villaCasts]
  );

  let visibleCasts: CastDetail[] = [];
  let enableLoop = false;

  if (filteredCasts.length >= 3) {
    visibleCasts = filteredCasts;
    enableLoop = true;
  } else if (filteredCasts.length === 2) {
    visibleCasts = filteredCasts;
    enableLoop = false; // 2枚のときはloopを無効
  } else if (filteredCasts.length === 1) {
    visibleCasts = filteredCasts;
    enableLoop = false;
  }

  // SP（Swiper）用のカード
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
          priority
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

  // PC用（フェード切替）カード：全件を重ねて active だけ表示
  const renderPcCard = (
    cast: CastDetail,
    isActive: boolean,
    keySuffix: string
  ) => (
    <Link
      key={`${cast.castId}-${keySuffix}`}
      href={`/villa/profile/?id=${cast.castId}`}
      className={`${styles.wrapLink} ${styles.fadeItem} ${
        isActive ? styles.isActive : ''
      }`}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
    >
      <div className={styles.shopName}>{cast.shopName}</div>
      <div className={styles.wrapImage}>
        <Image
          src={cast.castImage}
          alt={cast.castName}
          width={120}
          height={160}
          priority
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
      {/* PC版（左右2枠：左=先頭から / 右=最後から） */}
      <ul className={`${styles.blockPickUp} ${styles.pcVersion}`}>
        {/* 左枠（先頭から進む） */}
        <li>
          <div className={styles.fadeStage}>
            {villaCasts.map((cast, idx) =>
              renderPcCard(cast, idx === leftIndex, 'L')
            )}
          </div>
        </li>

        {/* 右枠（最後から戻る） */}
        <li>
          <div className={styles.fadeStage}>
            {villaCasts.map((cast, idx) =>
              renderPcCard(cast, idx === rightIndex, 'R')
            )}
          </div>
        </li>
      </ul>
      {/* スマホ版（PC左枠の並び＝JSON順をSwiper表示） */}
      <div className={styles.mobileBlockPickUp}>
        {visibleCasts.length >= 2 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            loop={enableLoop}
            watchOverflow={true}
            speed={1000}
            style={
              {
                '--swiper-transition-timing-function':
                  'cubic-bezier(0.25, 0.1, 0.25, 1)',
              } as CSSProperties
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
            {visibleCasts.map((cast, idx) => (
              <SwiperSlide key={`${cast.castId}-${idx}`}>
                {renderCastCard(cast)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : visibleCasts.length === 1 ? (
          <div className={styles.singleCastWrapper}>
            {renderCastCard(visibleCasts[0])}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default BlockPickUp;
