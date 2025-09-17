/* =======================================
 *ホットポイントヴィラ Layout
 * URL:src/app/hot/layout.tsx
 * Created: 2025-09-17
 * Last updated: 2025-09-17
 * ======================================= */
import ClientWrapper from '@/app/villa/ClientWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientWrapper>{children}</ClientWrapper>;
}
