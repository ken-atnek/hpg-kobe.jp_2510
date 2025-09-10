/* =======================================
 * キャストのグレード情報マッピング
 * 各 gradeId に対して表示ラベルとCSSクラス名を対応させる
 * 例: 1 → GRAND VIP, grade1
 * URL:src/constants/castGradeMap.ts
 * Referenced in: /app/page.tsx
 * Created: 2025-08-25
 * Last updated: 2025-09-02
 * ======================================= */

export const gradeMap: Record<number, { label: string; className: string }> = {
 1: { label: 'DIAMOND', className: 'grade1' },
 2: { label: 'PREMIUM', className: 'grade2' },
 3: { label: 'GRAND VIP', className: 'grade3' },
 4: { label: '筆頭 VIP', className: 'grade4' },
 5: { label: 'VIP', className: 'grade5' },
 6: { label: 'GOLD', className: 'grade6' },
 7: { label: 'SILVER', className: 'grade7' },
 8: { label: 'BRONZE', className: 'grade8' },
 9: { label: 'NORMAL', className: 'grade9' },
};
