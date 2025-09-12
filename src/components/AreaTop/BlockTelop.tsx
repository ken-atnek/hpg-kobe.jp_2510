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
    const fetchTelopData = async () => {
      try {
        // キャッシュバスティング用のタイムスタンプを追加
        const timestamp =
          process.env.NODE_ENV === 'development' ? Date.now() : '';
        const dataPath = `/data/area-top/areaTopTelop.json${timestamp ? `?t=${timestamp}` : ''}`;

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTelop(data.telopComment);
      } catch (error) {
        console.error('Telopデータの取得エラー:', error);
      }
    };

    fetchTelopData();
  }, []);

  return (
    <article className={styles.blockTelop}>
      <p>{telop}</p>
    </article>
  );
};

export default BlockTelop;
