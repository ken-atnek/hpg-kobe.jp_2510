/* =======================================
 * ホットポイントVILLA キャスト詳細
 * URL:src/app/villa/profile/page.tsx
 * Created: 2025-09-06
 * Last updated: 2025-10-13
 * ======================================= */
import { Suspense } from 'react';
import LayoutWrapperSub from '@/components/Shop/Villa/LayoutWrapperSub';
import CastProfile from '@/components/Shop/Profile/CastProfile';

export default function VIllaProfilePage() {
  return (
    <LayoutWrapperSub>
      <Suspense fallback={<div />}>
        <CastProfile />
      </Suspense>
    </LayoutWrapperSub>
  );
}
