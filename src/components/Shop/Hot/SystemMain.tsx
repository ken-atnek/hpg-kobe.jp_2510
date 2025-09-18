/* =======================================
 *店舗 システム MAIN
 * URL: src/components/Shop/Hot/SystemMain.tsx
 * Created: 2025-08-27
 * Last updated: 2025-08-27
 * ======================================= */
'use client';

import styles from '@/styles/ShopSystem.module.scss';
import { useEffect, useState } from 'react';
import BlockTopAnnounce from '@/components/Shop/system/BlockTopAnnounce';
import BlockPriceList from '@/components/Shop/system/BlockPriceList';
import BlockReservationGuide from '@/components/Shop/system/BlockReservationGuide';
import ImageWebReserve from '@/assets/images/hot/web-reserve.webp';
import Image from 'next/image';
import ExternalLink from '@/components/common/ExternalLink';
import BlockAccess from '@/components/Shop/system/BlockAccess';

const SystemMain = () => {
  const [requestFee, setRequestFee] = useState<number | null>(null);

  useEffect(() => {
    const fetchRequestFee = async () => {
      try {
        // キャッシュバスティング用のタイムスタンプを追加
        const timestamp =
          process.env.NODE_ENV === 'development' ? Date.now() : '';
        const dataPath = `/data/hot/RequestFee.json${timestamp ? `?t=${timestamp}` : ''}`;

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRequestFee(data.fee);
      } catch (error) {
        console.error('RequestFeeデータの取得エラー:', error);
        setRequestFee(null);
      }
    };

    fetchRequestFee();
  }, []);

  return (
    <section className={styles.containerSystemMain}>
      <h2 className="pageH2">
        <span>price</span>
        ご利用料金
      </h2>
      <BlockTopAnnounce />
      <BlockPriceList jsonPath={`/data/hot/Price.json`} />
      <article className={styles.blockRequestFee}>
        <h3>指名料</h3>
        {requestFee !== null ? (
          <span className={styles.price}>{requestFee.toLocaleString()}</span>
        ) : (
          <span>読み込み中...</span>
        )}
      </article>
      <BlockReservationGuide
        logoUrl="#svg_logoKobeHot"
        reserveUrl="https://www.cityheaven.net/hyogo/A2802/A280201/koubehp/S6ShopReservation/?pcmode=sp"
      />
      <article className={styles.blockReserveBan}>
        <ExternalLink href="https://www.cityheaven.net/hyogo/A2802/A280201/koubehp/S6ShopReservation/?pcmode=sp">
          <Image src={ImageWebReserve} alt="WEB予約" />
        </ExternalLink>
      </article>
      <BlockAccess variant="systemPage" />
    </section>
  );
};

export default SystemMain;
