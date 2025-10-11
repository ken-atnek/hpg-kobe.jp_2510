/* =======================================
 *店舗 TOP PICK UP
 * URL: src/components/Shop/TopSlideBan.tsx
 * Referenced in: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-22
 * Last updated: 2025-09-11
 * ======================================= */
'use client';
import styles from '@/styles/components/ShopTopSlideBan.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { usePathname } from 'next/navigation';
import { renderBannerItem, useBannerItems } from '@/lib/renderBannerItem';
import { getShopFromPath } from '@/lib/shopUtils';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useState, useMemo } from 'react';
import 'swiper/css';

const TopSlideBan = () => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const [mounted, setMounted] = useState(false);

  // 🔽 TopSlideBanは頻繁に更新されるため常にキャッシュバスティング
  const jsonSlideBan = useMemo(() => {
    const timestamp = Date.now();
    return `/data/${shop}/TopSlideBan.json?t=${timestamp}`;
  }, [shop]);

  const [items, setModalImage, modalImage] = useBannerItems(jsonSlideBan);

  useEffect(() => {
    setMounted(true);
  }, []);

  // スライド数が足りないときは複製してループ対応
  const minSlideCount = 8;
  const visibleItems =
    items.length === 0
      ? []
      : items.length < minSlideCount
        ? Array(Math.ceil(minSlideCount / items.length))
            .fill(items)
            .flat()
            .slice(0, minSlideCount)
        : items;

  // ループ有効判定（2枚以上のときのみ有効）
  const enableLoop = visibleItems.length > 1;

  const modal =
    modalImage && mounted
      ? createPortal(
          <div className="modal-overlay" onClick={() => setModalImage(null)}>
            <div className="modal-content">
              <Image
                src={modalImage}
                alt="ポップアップ画像"
                width={650}
                height={238}
              />
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <article className={styles.boxTopSlideBan}>
        <div className={styles.wrapImageList}>
          <Swiper
            slidesPerView={3}
            centeredSlides={true}
            loop={enableLoop}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            modules={[Autoplay]}
            speed={1400}
            initialSlide={0}
            watchOverflow={true}
            observer={true}
            observeParents={true}
            breakpoints={{
              // スマホ（768px未満）
              0: {
                slidesPerView: 1.25,
                centeredSlides: true,
                spaceBetween: 8,
                speed: 1000,
                initialSlide: 0,
                autoplay: { delay: 4000, disableOnInteraction: false },
              },
              // タブレット（768px以上）
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true,
                speed: 1400,
                autoplay: { delay: 5000, disableOnInteraction: false },
              },
            }}
          >
            {visibleItems.map((item, index) => (
              <SwiperSlide key={`${item.banId}-${index}`}>
                <div className={styles.aspectWrapper}>
                  {renderBannerItem(item, setModalImage)}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </article>
      {modal}
    </>
  );
};
export default TopSlideBan;
