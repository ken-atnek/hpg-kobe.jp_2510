/* =======================================
 *ホットポイントヴィラ 認証ページ
 * URL: src/app/hot/(auth)/page.tsx
 * Created: 2025-09-17
 * Last updated: 2025-09-17
 * ======================================= */
// src/app/hot/(auth)/auth/page.tsx
import Entrance from '@/components/Entrance/Entrance';

export default function HotAuthPage() {
  return (
    <Entrance
      scope="hot"
      backPath="/villa"
      headingText="神戸・三宮の風俗｜ファッションヘルス:ホットポイントヴィラ"
      excludeStoreId="kbVilla"
    />
  );
}
