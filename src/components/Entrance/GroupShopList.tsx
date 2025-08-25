/* =======================================
 * 神戸ホットポイントグループ 年齢認証 店舗リスト
 * URL: src/components/Entrance/GroupShopList.tsx
 * Referenced in: src/components/Entrance/Entrance.tsx
 * Created: 2025-08-19
 * Last updated: 2025-08-19
 * ======================================= */
'use client';
import ExternalLink from '@/components/common/ExternalLink';
import styles from '@/styles/Entrance.module.scss';
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type CSSProperties,
} from 'react';
import { GroupShops } from '@/data/GroupShopData';

const areaLabels: { [key: string]: string } = {
  yokohama: '横浜エリア',
  kyoto: '京都エリア',
  kobe: '神戸エリア',
  fukuoka: '福岡エリア',
  kumamoto: '熊本エリア',
};

// Group shops by area
const groupByArea = (shops: typeof GroupShops) => {
  return shops.reduce((acc: { [key: string]: typeof GroupShops }, shop) => {
    if (!acc[shop.area]) acc[shop.area] = [];
    acc[shop.area].push(shop);
    return acc;
  }, {});
};

const TRANSITION_MS = 260;

const EntranceGroupShopList = () => {
  const grouped = groupByArea(GroupShops);
  const areaKeys = Object.keys(grouped);

  // UIの状態
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  // UL内に実際に描画する中身（閉じアニメ中は残す）
  const [renderArea, setRenderArea] = useState<string | null>(null);

  // パネルの高さをJSでアニメ
  const panelRef = useRef<HTMLUListElement>(null);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({
    height: '0px',
    overflow: 'hidden',
    transition: `height ${TRANSITION_MS}ms ease`,
  });

  // ボタンクリック
  const handleSelect = useCallback((areaId: string) => {
    setSelectedArea((prev) => {
      if (prev === areaId) {
        // クローズ開始：selectedAreaをnullにして閉じアニメへ
        return null;
      }
      // オープン or 切替
      setRenderArea(areaId);
      return areaId;
    });
  }, []);

  // 初回オープンやキーボード操作時の整合性
  useEffect(() => {
    if (selectedArea && renderArea !== selectedArea) {
      setRenderArea(selectedArea);
    }
  }, [selectedArea, renderArea]);

  // オープン/クローズ/切替ごとの高さアニメを制御
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const forceReflow = () => void el.offsetHeight;

    if (selectedArea === null) {
      // === クローズ ===
      // 1) 現在高さを固定
      const current = getComputedStyle(el).height;
      setPanelStyle((s) => ({ ...s, height: current }));
      forceReflow();
      // 2) 0にアニメ
      setPanelStyle((s) => ({ ...s, height: '0px' }));
      return;
    }

    // === オープン or エリア切替 ===
    // いまの高さをfrom、高さ計算後にtoへ
    const from = getComputedStyle(el).height;
    setPanelStyle((s) => ({ ...s, height: from }));
    forceReflow();

    // 中身が変わった直後に scrollHeight を取得
    const to = `${el.scrollHeight}px`;
    setPanelStyle((s) => ({ ...s, height: to }));
  }, [selectedArea, renderArea]);

  // アニメ完了後の後片付け
  const handleTransitionEnd = () => {
    const el = panelRef.current;
    if (!el) return;

    if (selectedArea) {
      // 開き終わったら auto に戻して自然なレイアウトへ
      setPanelStyle((s) => ({ ...s, height: 'auto' }));
    } else {
      // 閉じ終わったら中身をアンマウント
      setRenderArea(null);
    }
  };

  return (
    <article className={styles.boxGroupShop}>
      <nav role="tablist" aria-label="エリア選択">
        {areaKeys.map((area) => {
          const isActive = selectedArea === area;
          const panelId = `panel-${area}`;
          const tabId = `tab-${area}`;
          return (
            <button
              key={area}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              data-active={isActive || undefined}
              onClick={() => handleSelect(area)}
            >
              <span>{areaLabels[area] ?? area}</span>
            </button>
          );
        })}
      </nav>
      <ul
        id={selectedArea ? `panel-${selectedArea}` : undefined}
        role={selectedArea ? 'tabpanel' : undefined}
        aria-labelledby={selectedArea ? `tab-${selectedArea}` : undefined}
        ref={panelRef}
        style={panelStyle}
        onTransitionEnd={handleTransitionEnd}
      >
        {renderArea
          ? grouped[renderArea].map((shop) => (
              <li key={shop.storeId}>
                <ExternalLink href={shop.url} aria-label={shop.name}>
                  {shop.name}
                </ExternalLink>
              </li>
            ))
          : null}
      </ul>
    </article>
  );
};

export default EntranceGroupShopList;
