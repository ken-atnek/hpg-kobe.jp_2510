'use client';
import { useMemo } from 'react';
import type { CSSProperties, JSX } from 'react';

type CSSVars = CSSProperties & {
  '--object-number'?: number;
  '--random-number'?: number;
};

// ---- Deterministic PRNG utilities (SSR/CSR 一致のため) ----

// FNV-1a hash for stable seeding from text
const hashString = (s: string) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

// Small fast PRNG (Mulberry32)
const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// 1..100 を生成し、偶数は負数にする（既存アニメ仕様を踏襲）
const signedRandomFrom = (seedBase: number) => {
  const rnd = mulberry32(seedBase)();
  const n = Math.floor(rnd * 100) + 1; // 1..100
  return n % 2 === 0 ? -n : n; // even -> negative
};

/**
 * 文字列を1文字ずつ <span> に分解し、CSS変数を付与して返す
 * - --object-number: インデックス番号（0始まり。1始まりにしたい場合は index + 1 に変更）
 * - --random-number: ±1～±100 の符号付き乱数（決定論的）
 */
export const useSplitText = (text: string): JSX.Element[] => {
  return useMemo(() => {
    const base = hashString(text);

    // 将来、書記素単位での分割にしたい場合は Intl.Segmenter への置き換えを検討
    const chars = Array.from(text);

    return chars.map((char, index) => {
      const style: CSSVars = {
        '--object-number': index, // 必要なら index + 1 に
        '--random-number': signedRandomFrom(base + index),
      };
      return (
        <span key={index} style={style} aria-hidden="true">
          {char}
        </span>
      );
    });
  }, [text]);
};
