/* =======================================
 *神戸ホットポイントグループ テロップ
 * URL: src/components/AreaTop/BlockTelop.tsx
 * Referenced in: /app/page.tsx
 * Created: 2025-08-19
 * Last updated: 2025-08-19
 * ======================================= */
'use client';
import { useEffect, useState } from 'react';
import styles from '@/styles/AreaTop.module.scss';

const BlockTelop = () => {
  const [telop, setTelop] = useState<string>('');

  useEffect(() => {
    fetch('/data/area-top/areaTopTelop.json')
      .then((res) => res.json())
      .then((data) => setTelop(data.telopComment));
  }, []);

  return (
    <article className={styles.blockTelop}>
      <p>{telop}</p>
    </article>
  );
};

export default BlockTelop;
