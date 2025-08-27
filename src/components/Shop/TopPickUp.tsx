/* =======================================
 *店舗 TOP PICK UP
 * URL: src/components/Shop/TopPickUp.tsx
 * Referenced in: src/components/common/ShopTopMain.tsx
 * Created: 2025-08-22
 * Last updated: 2025-08-22
 * ======================================= */
'use client';
import styles from '@/styles/components/ShopTopPickUp.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import { usePathname } from 'next/navigation';
import { renderBannerItem, useBannerItems } from '@/lib/renderBannerItem';
import Image from 'next/image';
import 'swiper/css';
const TopPickUp = () => {
  const pathname = usePathname();
  const path = pathname.split('/')[1];
  // 🔽 JSON パスを店舗別に切り替え
  const jsonBasePath = `/data/${path}`;
  const jsonPathPickUp = `${jsonBasePath}/topPickUp.json`;
  const [items, setModalImage, modalImage] = useBannerItems(jsonPathPickUp);

  return (
    <article className={styles.boxTopPickUp}>
      <div className={styles.wrapImageList}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={0}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay, Pagination]}
          speed={800}
          pagination={{ clickable: true }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.banId} style={{ width: '100%' }}>
              <div className={styles.aspectWrapper}>
                {renderBannerItem(item, setModalImage, index === 0)}
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
export default TopPickUp;
