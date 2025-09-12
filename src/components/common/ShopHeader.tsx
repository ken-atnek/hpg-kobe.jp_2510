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
    const fetchTelopData = async () => {
      try {
        // 開発環境でのみキャッシュバスティング
        const timestamp =
          process.env.NODE_ENV === 'development' ? Date.now() : '';
        const dataPath = `/data/${shop}/topTelop.json${timestamp ? `?t=${timestamp}` : ''}`;

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTelop(data.telopComment);
      } catch (error) {
        console.error('テロップデータの取得エラー:', error);
        setTelop(''); // エラー時は空文字
      }
    };

    fetchTelopData();
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
              <Link
                key={index}
                href={item.href}
                className={clsx(pathname === item.href && styles.active)}
              >
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
