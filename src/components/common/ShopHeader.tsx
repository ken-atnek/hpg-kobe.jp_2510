/* =======================================
 *神戸ホットポイント 店舗HEADER
 * URL: src/components/common/ShopHeader.tsx
 * Created: 2025-08-21
 * Last updated: 2025-09-11
 * ======================================= */
import { usePathname } from 'next/navigation';
import styles from '@/styles/components/common/Header.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ExternalLink from '@/components/common/ExternalLink';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';
type NavItem = {
  href: string;
  label: string;
  target?: boolean;
};

type HeaderProps = {
  title: string;
  navMenu: NavItem[];
};

const Header = ({ title, navMenu }: HeaderProps) => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);

  const [telop, setTelop] = useState<string>('');

  useEffect(() => {
    fetch(`/data/${shop}/topTelop.json`)
      .then((res) => res.json())
      .then((data) => setTelop(data.telopComment))
      .catch(() => setTelop('')); // エラー処理（存在しない店舗など）
  }, [shop]);

  return (
    <header className={clsx(styles.containerHeader, styles[activeStoreClass])}>
      <article className={styles.headerTop}>
        <div className={styles.boxHead}>
          <p>hot point group kobe area</p>
          <h1>{title}</h1>
        </div>
      </article>
      <div className={styles.boxNav}>
        <nav>
          {navMenu.map((item, index) =>
            item.target ? (
              <ExternalLink key={index} href={item.href}>
                {item.label}
              </ExternalLink>
            ) : (
              <Link key={index} href={item.href}>
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
      <hr className={styles.boxStripe} />
      <div className={styles.boxTelop}>
        <div className={styles.innerTelop}>
          <p>{telop}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
