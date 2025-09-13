/* =======================================
 * 神戸ホットポイントグループ 年齢認証ユーティリティ（TTL対応）
 * URL: src/lib/age.ts
 * Created: 2025-08-18
 * Last updated: 2025-09-12
 * ======================================= */

export type AgeScope = 'global' | 'hot' | 'villa' | 'group'; // 必要なスコープを列挙

// 保存形式（将来拡張も見据えて version を持たせる）
type StoredFlag = { exp: number; v: 1 };

const key = (scope: AgeScope) => `age-ok:${scope}`;

// 設定ファイル（public 配下）例: /age.config.json
const CONFIG_URL = '/age.config.json';
const DEFAULT_TTL_MINUTES = 1440; // 24時間 = 1440分

// 開発環境では 6時間で再認証（NODE_ENV=development）
const isDev = process?.env?.NODE_ENV === 'development';

// スコープ毎のTTLキャッシュ（初期化時にデフォルト値を設定）
const ttlCache: Record<string, number> = { default: DEFAULT_TTL_MINUTES };

type AgeJson = {
  ttlHours?: number;
  ttlMinutes?: number;
  scopes?: Record<string, { ttlHours?: number; ttlMinutes?: number }>;
};

// 分単位でのTTL読み込み関数
const loadTtlMinutes = async (scope: AgeScope): Promise<number> => {
  if (isDev) return 180; // 開発時は 180分(3時間)

  if (ttlCache[scope]) return ttlCache[scope];

  try {
    const res = await fetch(CONFIG_URL);
    if (!res.ok) throw new Error(`Failed to fetch config: ${res.statusText}`);
    const json: AgeJson = await res.json();

    // グローバル設定（優先順位: ttlMinutes > ttlHours）
    ttlCache.default = json.ttlMinutes ?? (json.ttlHours ?? 24) * 60;

    // スコープ別設定
    if (json.scopes) {
      for (const [key, config] of Object.entries(json.scopes)) {
        ttlCache[key] = config.ttlMinutes ?? (config.ttlHours ?? 0) * 60;
      }
    }
  } catch (error) {
    console.error('Failed to load age config:', error);
    ttlCache.default = DEFAULT_TTL_MINUTES;
  }

  return ttlCache[scope] ?? ttlCache.default;
};

/**
 * 認証済みにする（TTL付き）
 * - JSON設定の ttlMinutes または ttlHours を参照して有効期限(exp)を算出し、localStorageに保存
 * - ttlMinutes <= 0 の場合は無期限（MAX_SAFE_INTEGER）
 */
export const setAgeVerifiedAsync = async (scope: AgeScope) => {
  const ttlMinutes = await loadTtlMinutes(scope);
  const exp =
    ttlMinutes <= 0
      ? Number.MAX_SAFE_INTEGER
      : Date.now() + ttlMinutes * 60 * 1000; // 分→ミリ秒変換

  const flag: StoredFlag = { exp, v: 1 };
  localStorage.setItem(key(scope), JSON.stringify(flag));
};

/**
 * 認証済みか判定
 * - 旧形式（値が "1" のみ）の場合も true として扱う（後方互換）
 *   ※ ただし開発時は旧形式を無効扱いにして再認証を促す
 * - 新形式（JSON）の場合は exp を確認
 */
export const isAgeVerified = (scope: AgeScope) => {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem(key(scope));
  if (!raw) return false;

  if (raw === '1') {
    // 旧仕様：本番では無期限扱い、開発では無効扱い（テストしやすくするため）
    return !isDev;
  }

  try {
    const obj = JSON.parse(raw) as StoredFlag;
    return typeof obj.exp === 'number' && Date.now() < obj.exp;
  } catch (error) {
    console.error('Failed to parse age verification flag:', error);
    return false;
  }
};

/** 認証フラグを手動でクリア */
export const clearAgeVerified = (scope: AgeScope) => {
  localStorage.removeItem(key(scope));
};
