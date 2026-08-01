/* =======================================
 * 店舗 LEFTコンテンツ
 * URL: src/components/common/ShopLeft.tsx
 * Created: 2025-08-22
 * Last updated: 2025-09-19
 * ======================================= */
import styles from '@/styles/ShopLeft.module.scss';
import BannerGroup from '@/components/common/BannerGroup';
import clsx from 'clsx';
import { Shops } from '@/data/AreaShopData';
import ExternalLink from '@/components/common/ExternalLink';
import { getStoreClass, getLogoHref } from '@/lib/shopUtils';

type ShopLeftProps = {
  photoDiaryUrl?: string;
  shop: string;
  hideOnSp?: boolean;
};

const ShopLeft = ({ photoDiaryUrl, shop, hideOnSp = false }: ShopLeftProps) => {
  const activeStoreClass = getStoreClass(shop);
  const logoHref = getLogoHref(shop);
  const storeId = getStoreClass(shop); // 'kbHot' など
  const shopData = Shops.find((item) => item.storeId === storeId);

  // 🔽 タイムスタンプでキャッシュバスティング
  const timestamp = Date.now();

  // 🔽 JSON パスを店舗別に切り替え（タイムスタンプ付き）
  const jsonBasePath = `/data/${shop}`;
  const jsonPathTop = `${jsonBasePath}/LeftBan01.json?t=${timestamp}`;
  const jsonPathBottom = `${jsonBasePath}/LeftBan02.json?t=${timestamp}`;

  return (
    <section
      className={clsx(
        styles.containerShopLeft,
        styles[activeStoreClass],
        hideOnSp && styles.hideOnSp
      )}
    >
      <div className={styles.boxHead}>
        <div className={styles.itemLogo}>
          <svg
            className={styles.logoSvg}
            width="200"
            height="50"
            aria-hidden="true"
          >
            <use href={logoHref} />
          </svg>
        </div>
        {shopData && (
          <>
            <div className={styles.sidebarH2}>{shopData.nameEn}</div>
            <h2>{shopData.name}</h2>
            <ExternalLink
              href={`tel:${shopData.phone}`}
              className={styles.itemTel}
            >
              {shopData.phone}
            </ExternalLink>
          </>
        )}
      </div>
      <div className={styles.boxPhotoDiary}>
        <div className={styles.wrapTitle}>
          <h2>
            <span>
              photo
              <i>diary</i>
            </span>
            写メ日記
          </h2>
        </div>
        <div className={styles.titleObject}>
          <div className={styles.wrapText}>
            <div className={styles.shopName}>{shopData?.nameEn}</div>
            <div className={styles.title}>
              photo
              <i>diary</i>
            </div>
          </div>
        </div>
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
