// 開発環境と本番環境の状態チェック
export const isRealProduction = process.env.NEXT_PUBLIC_IS_REAL_PROD === 'true';

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_METADATA_BASE ?? 'https://www.hpg-kobe.jp/'
);
