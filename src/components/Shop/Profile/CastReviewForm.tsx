/* =======================================
 * 店舗  プロフィール内 お客様の声(フォーム)
 * URL: src/components/Shop/Profile/CastReviewForm.tsx
 * Referenced in: src/components/Shop/Profile/CastProfile.tsx
 * Created: 2025-09-11
 * Last updated: 2025-09-11
 * ======================================= */
import styles from '@/styles/ShopCastReview.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

const CastReviewForm = () => {
  const [selectedRating, setSelectedRating] = useState<number>(5);

  return (
    <form className={styles.innerForm}>
      <ul>
        <li>
          <label htmlFor="nickname">ニックネーム：</label>
          <input type="text" name="nickname" id="nickname" />
        </li>
        <li>
          <label htmlFor="email">メールアドレス：</label>
          <div className={styles.contents}>
            <input type="email" name="email" id="email" />
            <p className={styles.note}>
              ※クーポン券等の当選者発表に使用する為、公開はいたしません。
            </p>
          </div>
        </li>
        <li>
          <label htmlFor="rating">評価：</label>
          <div className={styles.ratingStars} id="rating">
            {Array.from({ length: 5 }, (_, i) => {
              const value = i + 1;
              return (
                <label key={value} className={styles.starLabel}>
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={selectedRating === value}
                    onChange={() => setSelectedRating(value)}
                    className={styles.starInput}
                  />
                  <svg
                    className={clsx(styles.starIcon, {
                      [styles.active]: value <= selectedRating,
                    })}
                    width="30"
                    height="28"
                    aria-hidden="true"
                  >
                    <use href="#svg_icon-star" />
                  </svg>
                </label>
              );
            })}
          </div>
        </li>
        <li>
          <label htmlFor="comment">レビュー内容：</label>
          <div className={styles.contents}>
            <textarea rows={4} name="comment" id="comment"></textarea>
            <p className={styles.note}>
              ※30文字以上の記入がある場合のみクーポン券等の抽選対象になります。
            </p>
          </div>
        </li>
      </ul>
      <button type="submit" className={styles.submitButton}>
        <p>
          この内容でレビューを
          <br />
          投稿する
        </p>
        <span className={styles.iconArrow}></span>
      </button>
    </form>
  );
};

export default CastReviewForm;
