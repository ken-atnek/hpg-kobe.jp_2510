/* =======================================
 *神戸ホットポイントグループ 年齢認証フォーム（入口コンポーネント）
 * URL: src/components/Entrance/Entrance.tsx
 * Referenced in: src/app/auth/page.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */
'use client';
import styles from '@/styles/Entrance.module.scss';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { setAgeVerifiedAsync, type AgeScope } from '@/lib/age';
import EntranceCastList from '@/components/Entrance/CastList';
import clsx from 'clsx';
// import EntranceAreaShopList from '@/components/Entrance/AreaShopList';
import EntranceGroupShopList from '@/components/Entrance/GroupShopList';
import ReciprocalLink from '@/components/Entrance/ReciprocalLink';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';
import Image, { type StaticImageData } from 'next/image';
import GroupLogo from '@/assets/images/logo/group_hot.webp';

// ロゴ設定（このコンポーネント内でのみ使用）
type LogoScope = 'group' | 'hot' | 'villa';

interface LogoConfig {
  type: 'svg' | 'image';
  src?: string | StaticImageData;
  href?: string;
  alt: string;
  width: number;
  height: number;
}

const getLogoConfig = (scope: LogoScope): LogoConfig => {
  const logoConfigs: { [key in LogoScope]: LogoConfig } = {
    group: {
      type: 'image',
      src: GroupLogo,
      alt: 'HOT POINT GROUP',
      width: 100,
      height: 60,
    },
    hot: {
      type: 'svg',
      href: '#svg_logoKobeHot',
      alt: '神戸ホットポイント',
      width: 120,
      height: 40,
    },
    villa: {
      type: 'svg',
      href: '#svg_logoKobeVilla',
      alt: 'ホットポイント VILLA',
      width: 100,
      height: 50,
    },
  };
  return logoConfigs[scope];
};

// ロゴコンポーネント（このコンポーネント内でのみ使用）
const Logo = ({
  scope,
  className,
}: {
  scope: LogoScope;
  className?: string;
}) => {
  const config = getLogoConfig(scope);

  if (config.type === 'svg') {
    return (
      <svg
        width={config.width}
        height={config.height}
        aria-label={config.alt}
        className={className}
      >
        <use href={config.href} />
      </svg>
    );
  }

  return (
    <Image
      src={config.src!}
      alt={config.alt}
      width={config.width}
      height={config.height}
      className={className}
    />
  );
};

export default function Entrance({
  scope,
  backPath,
  // excludeStoreId,
}: {
  scope: AgeScope;
  backPath: string;
  excludeStoreId?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);

  return (
    <main className={clsx(styles.containerEntrance, styles[activeStoreClass])}>
      <section className={styles.blockCastList}>
        <EntranceCastList />
      </section>
      <section className={styles.blockButton}>
        <button
          type="button"
          className={styles.itemButton}
          onClick={async () => {
            await Promise.all([
              setAgeVerifiedAsync('group'),
              setAgeVerifiedAsync('hot'),
              setAgeVerifiedAsync('villa'),
              setAgeVerifiedAsync('global'),
            ]);
            router.replace(backPath);
          }}
        >
          yes
        </button>
        <div className={clsx(styles.boxAnnounce, styles[activeStoreClass])}>
          <Logo scope={scope as LogoScope} className={styles.logoSvg} />
          <p>あなたは18歳以上ですか？</p>
        </div>
        <a
          href="https://www.yahoo.co.jp/"
          aria-label="Yahooへ"
          className={styles.itemButton}
        >
          no
        </a>
        {shop === 'villa' && (
          <div className={styles.banHeaven}>
            <a
              href="https://www.cityheaven.net/hyogo/A2802/A280201/koube_hp_part3/?of=y2"
              target="_blank"
              rel="noopener noreferrer" // セキュリティ対策
            >
              <Image
                src="https://img.cityheaven.net/img/kikaku/hy_memberdiary/wp-content/uploads/2023/09/HN遷移バナー_オフィシャル用.png"
                alt="ヘブンネット公式サイトへ" // alt属性追加
                width={600} // 適切なサイズ指定
                height={100} // 適切なサイズ指定
                style={{ width: '100%', height: 'auto' }} // レスポンシブ対応
                loading="lazy" // 遅延読み込み
              />
            </a>

            <a
              href="https://www.girlsheaven-job.net/hyogo/ma-45/sa-460/koube_hp_part3/?of=y"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://img.cityheaven.net/img/kikaku/hy_memberdiary/wp-content/uploads/2023/09/GH遷移バナー_オフィシャル用-1.png"
                alt="ガールズヘブン求人サイトへ"
                width={600}
                height={100}
                style={{ width: '100%', height: 'auto' }}
                loading="lazy"
              />
            </a>
            <a
              href="https://yoasobi-heaven.com/en/hyogo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://yoasobi-heaven.com/img/renewal/linklist/bn_yoasobi-heaven_200x40.jpg"
                alt="ガールズヘブン求人サイトへ"
                width={200}
                height={400}
                style={{
                  width: '200px',
                  height: 'auto',
                  alignSelf: 'center',
                }}
                loading="lazy"
              />
            </a>
          </div>
        )}
      </section>
      {/* <section className={styles.blockAreaShop}>
        <h3 className={styles.itemH3}>area shop</h3>
        <EntranceAreaShopList excludeStoreId={excludeStoreId} />
      </section> */}
      <section className={styles.blockReciprocalLink}>
        <ReciprocalLink />
      </section>
      <section className={styles.blockGroupShop}>
        <h3 className={styles.itemH3}>group shop list</h3>
        <EntranceGroupShopList />
      </section>
      <div className={styles.copyRight}>
        <p>
          当サイトはアダルトな内容を含んでいます。
          <br className="sp" />
          18歳未満の方の閲覧は堅くご遠慮願います。
        </p>
      </div>
    </main>
  );
}
