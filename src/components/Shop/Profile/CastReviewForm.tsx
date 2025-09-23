/* =======================================
 * 店舗  プロフィール内 お客様の声(フォーム)
 * URL: src/components/Shop/Profile/CastReviewForm.tsx
 * Referenced in: src/components/Shop/Profile/CastProfile.tsx
 * Created: 2025-09-11
 * Last updated: 2025-09-11
 * ======================================= */
import styles from '@/styles/ShopCastReview.module.scss';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

import { useEffect, useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';
import { getShopFromPath } from '@/lib/shopUtils';

const CastReviewForm = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const castId = searchParams.get('id');
  const shop = getShopFromPath(pathname);

  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダル制御

  const [email, setEmail] = useState('');
  const [NickName, setNickName] = useState('');
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [comment, setComment] = useState('');

  // ** 送信処理 **
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    // ** 入力チェック **
    if (!NickName || !email || !comment) {
      setStatus('全ての項目を入力してください');
      return;
    }
    // ** メールアドレスの形式チェック **
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('正しいメールアドレスを入力してください');
      return;
    }
    // ** キャストIDの存在チェック **
    if (!castId) {
      setStatus('キャスト情報が取得できませんでした');
      return;
    }
    // ** 送信処理開始 **
    const formData = new FormData();
    formData.append('shop_dir', shop);
    formData.append('cast_id', castId);
    formData.append('name', NickName);
    formData.append('email', email);
    formData.append('rating', selectedRating.toString());
    formData.append('comment', comment);
    try {
      const response = await fetch(
        'https://demo-hpg-kobe.bxchange.net/backend/send_review.php',
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('サーバーレスポンス:', result);
      if (result.success) {
        // モーダルを開く
        setIsModalOpen(true);
        // 3秒後に自動閉じる
        setTimeout(() => setIsModalOpen(false), 3000);
        // フォームをリセット
        setNickName('');
        setEmail('');
        setComment('');
        setSelectedRating(5);
        // 成功時はステータスをクリア
        setStatus('');
      } else {
        setStatus(result.error || '送信に失敗しました。');
      }
    } catch (error) {
      console.error('エラー:', error);
      setStatus('通信エラーが発生しました。しばらく後にもう一度お試しください。');
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      // メニューを開く時：スクロールを禁止
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100vh';
    } else {
      // メニューを閉じる時：スタイルを復元
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    }
  }, [isModalOpen]);
  return (
    <>
      <form className={styles.innerForm} onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="nickname">ニックネーム：</label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              value={NickName}
              onChange={(e) => setNickName(e.target.value)}
              />
          </li>
          <li>
            <label htmlFor="email">メールアドレス：</label>
            <div className={styles.contents}>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              <p className={styles.note}>
                ※クーポン券等の当選者発表に使用する為、公開はいたしません。
              </p>
            </div>
          </li>
          <li className={styles.boxRating}>
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
              <textarea
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="レビュー内容をご入力ください..."
              />
              <p className={styles.note}>
                ※30文字以上の記入がある場合のみクーポン券等の抽選対象になります。
                <br />
                現在の文字数: {comment.length}文字
                {comment.length >= 30 && <span style={{color: 'green'}}> ✓クーポン対象</span>}
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
        {status && (
          <p className={styles.statusMessage} style={{
            color: status.includes('エラー') || status.includes('失敗') ? 'red' : 'blue',
            marginTop: '10px',
            fontWeight: 'bold'
          }}>
            {status}
          </p>
        )}
      </form>
      {/* ✅ モーダル表示 */}
      {isModalOpen &&
        createPortal(
          <div className={styles.blockModal} onClick={() => setIsModalOpen(false)}>
            <div>
              <p>レビューを投稿しました。</p>
              <button onClick={() => setIsModalOpen(false)}>閉じる</button>
            </div>
          </div>,
          document.body
        )
      }
    </>
  );
};

export default CastReviewForm;
