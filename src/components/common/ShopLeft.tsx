'use client';
/* =======================================
 * 店舗 LEFTコンテンツ
 * URL: src/components/common/ShopLeft.tsx
 * Created: 2025-08-22
 * Last updated: 2025-08-23
 * ======================================= */
import { usePathname } from 'next/navigation';
import styles from '@/styles/ShopCommon.module.scss';
import BannerGroup from '@/components/common/BannerGroup';
import clsx from 'clsx';
import { Shops } from '@/data/AreaShopData';
import ExternalLink from '@/components/common/ExternalLink';

type ShopLeftProps = {
  logoUrl?: string;
  photoDiaryUrl?: string;
};

const ShopLeft = ({ logoUrl, photoDiaryUrl }: ShopLeftProps) => {
  const pathname = usePathname();
  const path = pathname.split('/')[1];

  const storeIdMap: Record<string, string> = {
    hot: 'kbHot',
    villa: 'kbVilla',
  };

  const storeId = storeIdMap[path];
  const shopData = Shops.find((shop) => shop.storeId === storeId);

  // 🔽 JSON パスを店舗別に切り替え
  const jsonBasePath = `/data/${path}`;
  const jsonPathTop = `${jsonBasePath}/LeftBan01.json`;
  const jsonPathBottom = `${jsonBasePath}/LeftBan02.json`;

  return (
    <section className={clsx(styles.containerShopLeft, styles[storeId])}>
      {shopData && (
        <div className={styles.boxHead}>
          <div className={styles.itemLogo}>
            <svg
              className={styles.logoSvg}
              width="200"
              height="50"
              aria-hidden="true"
            >
              <use href={logoUrl} />
            </svg>
          </div>
          <div className={styles.sidebarH2}>{shopData.nameEn}</div>
          <h2>{shopData.name}</h2>
          <ExternalLink
            href={`tel:${shopData.phone}`}
            className={styles.itemTel}
          >
            {shopData.phone}
          </ExternalLink>
        </div>
      )}
      <div className={styles.boxPhotoDiary}>
        <div className={styles.wrapContents}>
          <iframe src={photoDiaryUrl} />
        </div>
      </div>
      <BannerGroup jsonPath={jsonPathTop} className={styles.boxBanTop} />
      <BannerGroup jsonPath={jsonPathBottom} className={styles.boxBanBottom} />
    </section>
  );
};

export default ShopLeft;
