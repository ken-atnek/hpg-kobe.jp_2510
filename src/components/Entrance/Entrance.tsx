/* =======================================
 *神戸ホットポイントグループ 年齢認証フォーム（入口コンポーネント）
 * URL: src/components/Entrance/Entrance.tsx
 * Referenced in: src/app/auth/page.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */
'use client';
import { useRouter } from 'next/navigation';
import { setAgeVerifiedAsync, type AgeScope } from '@/lib/age';
import styles from '@/styles/Entrance.module.scss';
import EntranceCastList from '@/components/Entrance/CastList';
import GroupLogo from '@/assets/images/logo/group_hot.webp';
import Image from 'next/image';
import EntranceAreaShopList from '@/components/Entrance/AreaShopList';
import EntranceGroupShopList from '@/components/Entrance/GroupShopList';
export default function Entrance({
  scope,
  backPath,
}: {
  scope: AgeScope;
  backPath: string;
}) {
  const router = useRouter();

  return (
    <main className={styles.containerEntrance}>
      <h1>神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイントグループ</h1>
      <section className={styles.blockCastList}>
        <EntranceCastList />
      </section>
      <section className={styles.blockButton}>
        <button
          type="button"
          className={styles.itemButton}
          onClick={async () => {
            await setAgeVerifiedAsync(scope);
            router.replace(backPath);
          }}
        >
          yes
        </button>
        <div className={styles.boxAnnounce}>
          <Image src={GroupLogo} alt="HOT POINT GROUP" />
          <h2>あなたは18歳以上ですか？</h2>
        </div>
        <a
          href="https://www.yahoo.co.jp/"
          aria-label="Yahooへ"
          className={styles.itemButton}
        >
          no
        </a>
      </section>
      <section className={styles.blockAreaShop}>
        <h3 className={styles.itemH3}>area shop</h3>
        <EntranceAreaShopList />
      </section>
      <section className={styles.blockGroupShop}>
        <h3 className={styles.itemH3}>group shop list</h3>
        <EntranceGroupShopList />
      </section>
      <div className={styles.copyRight}>
        <p>
          当サイトはアダルトな内容を含んでいます。18歳未満の方の閲覧は堅くご遠慮願います。
        </p>
      </div>
    </main>
  );
}
