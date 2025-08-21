/* =======================================
 * 神戸ホットポイントグループ 年齢認証ユーティリティ（TTL対応）
 * URL: src/lib/age.ts
 * Created: 2025-08-18
 * Last updated: 2025-08-19
 * ======================================= */

export type AgeScope = 'global' | 'hot' | 'villa' | 'group'; // 必要なスコープを列挙

// 保存形式（将来拡張も見据えて version を持たせる）
type StoredFlag = { exp: number; v: 1 };

const key = (scope: AgeScope) => `age-ok:${scope}`;

// 設定ファイル（public 配下）例: /age.config.json
// {
//   "ttlHours": 24,
//   "scopes": {
//     "global": { "ttlHours": 24 }
//   }
// }
const CONFIG_URL = './age.config.json';
const DEFAULT_TTL_HOURS = 24; // JSONが無い/壊れている場合のデフォルト

// 開発環境では 6時間で再認証（NODE_ENV=development）
const DEV_TTL_SECONDS = 21600;
const isDev =
  typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';

// スコープ毎のTTLキャッシュ（時間単位）
let ttlCache: Record<string, number> | null = null;

type AgeJson = {
  ttlHours?: number;
  scopes?: Record<string, { ttlHours?: number }>;
};

const loadTtlHours = async (scope: AgeScope): Promise<number> => {
  // 開発時は常に 5 秒固定（秒→時間換算）
  if (isDev) return DEV_TTL_SECONDS / 3600;

  if (ttlCache) return ttlCache[scope] ?? ttlCache.default ?? DEFAULT_TTL_HOURS;
  try {
    const res = await fetch(CONFIG_URL, { cache: 'no-store' });
    if (res.ok) {
      const json = (await res.json()) as AgeJson;
      const base =
        typeof json.ttlHours === 'number' ? json.ttlHours : DEFAULT_TTL_HOURS;
      ttlCache = { default: base };
      if (json.scopes) {
        for (const [k, v] of Object.entries(json.scopes)) {
          const ttl = typeof v.ttlHours === 'number' ? v.ttlHours : base;
          ttlCache[k] = ttl;
        }
      }
    } else {
      ttlCache = { default: DEFAULT_TTL_HOURS };
    }
  } catch {
    ttlCache = { default: DEFAULT_TTL_HOURS };
  }
  return ttlCache[scope] ?? ttlCache.default!;
};

/**
 * 認証済みにする（TTL付き）
 * - JSON設定の ttlHours を参照して有効期限(exp)を算出し、localStorageに保存
 * - ttlHours <= 0 の場合は無期限（MAX_SAFE_INTEGER）
 */
export const setAgeVerifiedAsync = async (scope: AgeScope) => {
  const ttlHours = await loadTtlHours(scope);
  const exp =
    ttlHours <= 0
      ? Number.MAX_SAFE_INTEGER
      : Date.now() + ttlHours * 60 * 60 * 1000;
  const payload: StoredFlag = { exp, v: 1 };
  localStorage.setItem(key(scope), JSON.stringify(payload));
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
    if (isDev) return false;
    return true;
  }
  try {
    const obj = JSON.parse(raw) as StoredFlag;
    if (typeof obj.exp !== 'number') return false;
    return Date.now() < obj.exp;
  } catch {
    return false;
  }
};

/** 認証フラグを手動でクリア */
export const clearAgeVerified = (scope: AgeScope) => {
  localStorage.removeItem(key(scope));
};
