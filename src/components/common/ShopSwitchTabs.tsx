'use client';
/* =======================================
 *店舗切替タブ
 * URL: src/components/common/ShopSwitchTabs.tsx
 * Referenced in: 複数のページで使用
 * Created: 2025-09-16
 * Last updated: 2025-09-16
 * ======================================= */

import styles from '@/styles/components/common/ShopSwitchTabs.module.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { getShopFromPath, storeIdMap } from '@/lib/shopUtils';

type ShopTab = {
  id: string;
  name: string;
  href: string;
};

type ShopSwitchTabsProps = {
  basePath?: string;
  tabs?: ShopTab[];
  variant?: 'default' | 'schedule' | 'weekly-schedule' | 'realtime' | 'cast';
};

const ShopSwitchTabs = ({
  basePath,
  tabs,
  variant = 'default',
}: ShopSwitchTabsProps) => {
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);

  // shopUtilsのstoreIdMapから動的にタブを生成
  const defaultTabs: ShopTab[] = Object.keys(storeIdMap).map((shopId) => ({
    id: shopId,
    name: getShopDisplayName(shopId),
    href: basePath ? `/${shopId}/${basePath}/` : `/${shopId}/weekly-schedule/`,
  }));

  const finalTabs = tabs || defaultTabs;

  return (
    <nav className={clsx(styles.shopSwitchTabs, styles[variant])}>
      {finalTabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={clsx(
            styles[storeIdMap[tab.id]], // shopUtilsのstoreIdMapを直接使用
            shop === tab.id && styles.isActive
          )}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );
};

// 店舗表示名を取得するヘルパー関数
function getShopDisplayName(shopId: string): string {
  const shopNames: Record<string, string> = {
    hot: '神戸ホットポイント',
    villa: 'ホットポイント VILLA',
  };
  return shopNames[shopId] || shopId;
}

export default ShopSwitchTabs;
