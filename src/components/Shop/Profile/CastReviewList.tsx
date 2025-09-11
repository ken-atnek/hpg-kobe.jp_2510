/* =======================================
 * 店舗  プロフィール内 お客様の声
 * URL: src/components/Shop/Profile/CastReviewList.tsx
 * Referenced in: src/components/Shop/Profile/CastProfile.tsx
 * Created: 2025-09-11
 * Last updated: 2025-09-11
 * ======================================= */

import { useEffect, useState } from 'react';
import styles from '@/styles/ShopCastReview.module.scss';
import clsx from 'clsx';

type ReviewItem = {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
};

type Props = {
  castId: string;
  shop: string;
};

const CastReviewList = ({ castId, shop }: Props) => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/cast/${shop}/${castId}/review.json`);
        if (!res.ok) throw new Error('レビュー取得失敗');
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        setReviews([]);
      }
    };
    fetchReviews();
  }, [castId, shop]);

  return (
    <div className={styles.innerReviewList}>
      <ul>
        {reviews.length === 0 ? (
          <p className={styles.noReview}>まだ口コミがありません</p>
        ) : (
          reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <div className={styles.wrapHead}>
                <div className={styles.reviewRating}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={clsx(styles.logoSvg, {
                        [styles.active]: i < review.rating,
                      })}
                      width="30"
                      height="28"
                      aria-hidden="true"
                    >
                      <use href="#svg_icon-star" />
                    </svg>
                  ))}
                </div>
                <time dateTime={review.date}>
                  {new Date(review.date)
                    .toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                    .replaceAll('/', '.')}
                </time>
                <span>{review.name}さんの口コミ</span>
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CastReviewList;
