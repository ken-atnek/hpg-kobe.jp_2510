/* =======================================
 *神戸ホットポイントグループ ショップリンク
 * URL: src/components/common/ContainerShopList.tsx
 * Referenced in: /app/page.tsx
 * Created: 2025-08-19
 * Last updated: 2025-09-11
 * ======================================= */
import styles from '@/styles/components/common/ContainerShopList.module.scss';
import { Shops } from '@/data/AreaShopData';
import Link from 'next/link';
import ExternalLink from '@/components/common/ExternalLink';
import clsx from 'clsx';

type ContainerShopListProps = {
  activeStoreClass?: string;
};

const ContainerShopList = ({ activeStoreClass }: ContainerShopListProps) => {
  return (
    <section
      className={clsx(
        styles.containerShopList,
        activeStoreClass && styles[activeStoreClass]
      )}
    >
      <h2>hotpoint group kobe area</h2>
      <a href="#" className={styles.pageTop}>
        <span>page top</span>
      </a>
      <ul>
        {Shops.map(
          (
            shopItem // shop → shopItem に変数名変更（重複回避）
          ) => (
            <li key={shopItem.storeId}>
              <Link
                href={shopItem.url}
                className={clsx(styles.itemLogo, styles[shopItem.storeId])}
              >
                <svg
                  className={styles.logoSvg}
                  width="200"
                  height="50"
                  aria-hidden="true"
                >
                  <use href={shopItem.svgLogo} />
                </svg>
              </Link>
              <p>{shopItem.name}</p>
              <ExternalLink
                href={`tel:${shopItem.phone}`}
                className={styles.itemTel}
              >
                {shopItem.phone}
              </ExternalLink>
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default ContainerShopList;
