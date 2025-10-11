/* =======================================
 *店舗 TOP PICK UP
 * URL: src/components/Shop/TopPickUp.tsx
 * Referenced in: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-22
 * Last updated: 2025-09-11
 * ======================================= */
'use client';
import styles from '@/styles/components/ShopTopPickUp.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import { usePathname } from 'next/navigation';
import { renderBannerItem, useBannerItems } from '@/lib/renderBannerItem';
import Image from 'next/image';
import { getShopFromPath } from '@/lib/shopUtils';
import { createPortal } from 'react-dom';
import { useEffect, useState, useMemo } from 'react';
import 'swiper/css';

const TopPickUp = () => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const [mounted, setMounted] = useState(false);

  const jsonPathPickUp = useMemo(() => {
    const timestamp = Date.now();
    return `/data/${shop}/TopPickUp.json?t=${timestamp}`;
  }, [shop]);

  const [items, setModalImage, modalImage] = useBannerItems(jsonPathPickUp);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // スライド数が足りない場合は複製してループ対応
  const minSlides = 4;
  const visibleItems =
    items.length === 0
      ? []
      : items.length < minSlides
        ? Array(Math.ceil(minSlides / items.length))
            .fill(items)
            .flat()
            .slice(0, minSlides)
        : items;

  const enableLoop = visibleItems.length > 1;

  return (
    <>
      <article className={styles.boxTopPickUp}>
        <div className={styles.wrapImageList}>
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={0}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={enableLoop}
            modules={[Autoplay, Pagination]}
            speed={800}
            pagination={{ clickable: true }}
          >
            {visibleItems.map((item, index) => (
              <SwiperSlide
                key={`${item.banId}-${index}`}
                style={{ width: '100%' }}
              >
                <div className={styles.aspectWrapper}>
                  {renderBannerItem(item, setModalImage, index === 0)}
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
export default TopPickUp;
