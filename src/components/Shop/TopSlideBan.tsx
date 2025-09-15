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
import 'swiper/css';
const TopSlideBan = () => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);

  // 🔽 JSON パスを店舗別に切り替え
  const jsonPathPickUp = `/data/${shop}/topSlideBan.json`;
  const [items, setModalImage, modalImage] = useBannerItems(jsonPathPickUp);

  // スライド数が足りないときは複製してループ対応
  const minSlideCount = 8;
  const visibleItems =
    items.length < minSlideCount
      ? [...items, ...items, ...items] // 3倍に増やす（元の構造を壊さず）
      : items;

  return (
    <article className={styles.boxTopSlideBan}>
      <div className={styles.wrapImageList}>
        <Swiper
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
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
          {visibleItems.map((item) => (
            <SwiperSlide key={`${item.banId}-${Math.random()}`}>
              <div className={styles.aspectWrapper}>
                {renderBannerItem(item, setModalImage)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
    </article>
  );
};
export default TopSlideBan;
