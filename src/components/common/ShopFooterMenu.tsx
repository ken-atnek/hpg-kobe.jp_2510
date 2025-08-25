/* =======================================
 *店舗 FOOTER MENU
 * URL: src/components/common/ShopFooterMenu.tsx
 * Created: 2025-08-21
 * Last updated: 2025-08-21
 * ======================================= */
import styles from '@/styles/ShopCommon.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import ExternalLink from '@/components/common/ExternalLink';
type NavItem = {
  href: string;
  label: string;
  target?: boolean;
};

type ShopFooterMenuProps = {
  className?: string;
  navMenu: NavItem[];
};

const ShopFooterMenu = ({ className, navMenu }: ShopFooterMenuProps) => {
  return (
    <section className={clsx(styles.shopFooterMenu, className)}>
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
    </section>
  );
};

export default ShopFooterMenu;
