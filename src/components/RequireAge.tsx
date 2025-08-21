/* =======================================
 *神戸ホットポイントグループ 年齢認証ガード（保護用ラッパー）
 * URL: src/components/RequireAge.tsx
 * Created: 2025-08-18
 * Last updated: 2025-08-18
 * ======================================= */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAgeVerified, type AgeScope } from '@/lib/age';

export default function RequireAge({
  scope,
  authPath,
  children,
}: {
  scope: AgeScope;
  authPath: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const isOk = isAgeVerified(scope);
    setVerified(isOk);

    if (!isOk) {
      router.replace(authPath);
    }
  }, [scope, authPath, router]);

  // 初期状態：判定中
  if (verified === null) {
    return <div style={{ display: 'none' }} />; // SSRで何も表示されないように
  }

  // 認証NG：すでに router.replace で遷移済み
  if (!verified) return null;

  // 認証OK
  return <>{children}</>;
}
