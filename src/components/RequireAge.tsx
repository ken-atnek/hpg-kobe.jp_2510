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
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    const verified = isAgeVerified(scope);
    setOk(verified);
    if (!verified) router.replace(authPath);
  }, [router, scope, authPath]);

  if (ok === null) return null;
  if (!ok) return null;
  return <>{children}</>;
}
