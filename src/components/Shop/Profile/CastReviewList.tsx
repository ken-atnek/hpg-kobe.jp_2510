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
import { convertRemToPx } from '@/lib/convertRemToPx';

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
        // キャッシュバスティング用のタイムスタンプを追加
        const timestamp =
          process.env.NODE_ENV === 'development' ? Date.now() : '';
        const dataPath = `/cast/${shop}/${castId}/review.json${timestamp ? `?t=${timestamp}` : ''}`;

        const res = await fetch(dataPath);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ReviewItem[] = await res.json();
        setReviews(data);
      } catch {
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
              <div
                  className={styles.reviewComment}
                  dangerouslySetInnerHTML={{
                    __html: convertRemToPx(review.comment),
                  }}
                />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CastReviewList;
