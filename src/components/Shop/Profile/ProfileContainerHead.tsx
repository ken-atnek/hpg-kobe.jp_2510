/* =======================================
 *店舗  キャストプロフィールタイトル
 * URL: src/components/Shop/Profile/ProfileContainerHead.tsx
 * Referenced in: src/components/Shop/Profile/CastProfile.tsx
 * Created: 2025-09-06
 * Last updated: 2025-09-06
 * ======================================= */

import styles from '@/styles/ShopCastProfile.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { getShopFromPath, getStoreClass, getLogoHref } from '@/lib/shopUtils';

const ProfileContainerHead = () => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);
  const logoHref = getLogoHref(shop);

  return (
    <section className={clsx(styles.containerHead, styles[activeStoreClass])}>
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
      <Link href={`/${shop}/cast/`} className={styles.linkList}>
        一覧へ戻る
      </Link>
    </section>
  );
};
export default ProfileContainerHead;
