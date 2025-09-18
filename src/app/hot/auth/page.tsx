/* =======================================
 *神戸ホットポイント 認証ページ
 * URL: src/app/hot/(auth)/page.tsx
 * Created: 2025-08-20
 * Last updated: 2025-08-20
 * ======================================= */
// src/app/hot/(auth)/auth/page.tsx
import Entrance from '@/components/Entrance/Entrance';

export default function HotAuthPage() {
  return (
    <Entrance
      scope="hot"
      backPath="/hot"
      headingText="神戸・三宮の風俗｜ファッションヘルス:神戸ホットポイント"
      excludeStoreId="kbHot"
    />
  );
}
