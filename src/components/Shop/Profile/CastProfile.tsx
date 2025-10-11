/* =======================================
 *店舗  キャストプロフィール
 * URL: src/components/Shop/Profile/CastProfile.tsx
 * Referenced in: src/app/hot/profile/page.tsx
 * Created: 2025-09-06
 * Last updated: 2025-10-08
 * ======================================= */
'use client';

import styles from '@/styles/ShopCastProfile.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { gradeMap } from '@/constants/castGradeMap';
import { typeLabels } from '@/constants/castTypeLabels';
import { getShopFromPath, getStoreClass } from '@/lib/shopUtils';
import { platinumMailUrlMap } from '@/lib/shopUtils';
import { convertRemToPx } from '@/lib/convertRemToPx';
import { trackPageAccess } from '@/lib/accessCounterApi';
import { trackCastAccess } from '@/lib/accessCastCounterApi';

import type { CastDetail } from '@/types/CastDetails';
import ProfileContainerHead from '@/components/Shop/Profile/ProfileContainerHead';
import ExternalLink from '@/components/common/ExternalLink';
import CastSchedule from '@/components/Shop/Profile/CastSchedule';
import CastReviewList from '@/components/Shop/Profile/CastReviewList';
import CastReviewForm from '@/components/Shop/Profile/CastReviewForm';

export default function CastProfile() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const castId = searchParams.get('id');
  const [cast, setCast] = useState<CastDetail | null>(null);
  const [error, setError] = useState(false);

  const shop = getShopFromPath(pathname);
  const activeStoreClass = getStoreClass(shop);
  const mailUrl = platinumMailUrlMap[shop] || '#';

  const [prevCastId, setPrevCastId] = useState<string | null>(null);
  const [nextCastId, setNextCastId] = useState<string | null>(null);
  const [prevCastName, setPrevCastName] = useState<string | null>(null);
  const [nextCastName, setNextCastName] = useState<string | null>(null);
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get('type') || 'ranking';
  const rankingType = queryParams.get('rankingType'); // 追加

  useEffect(() => {
    try {
      let castOrderStr: string | null = null;
      if (type === 'ranking' && rankingType) {
        castOrderStr = sessionStorage.getItem(
          `castOrder_ranking_${rankingType}`
        );
      } else {
        castOrderStr = sessionStorage.getItem(`castOrder_${type}`);
      }
      if (!castOrderStr) return;

      type CastOrderItem = {
        id: string;
        name: string;
      };
      const castOrder = JSON.parse(castOrderStr) as CastOrderItem[];
      const currentId = searchParams.get('id');
      if (!currentId) return;

      const currentIndex = castOrder.findIndex((c) => c.id === currentId);
      if (currentIndex === -1) return;

      const prev = castOrder[currentIndex - 1];
      const next = castOrder[currentIndex + 1];

      setPrevCastId(prev?.id || null);
      setNextCastId(next?.id || null);
      setPrevCastName(prev?.name || null);
      setNextCastName(next?.name || null);
    } catch {
      // エラー時の処理（何もしない）
    }
  }, [type, rankingType, castId, searchParams]);

  useEffect(() => {
    if (cast) {
      document.title = `${cast.castName}さんのプロフィール | 神戸ホットポイント`;

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: cast.castName,
        description: `${cast.age}歳 / ${cast.tall}cm / ${cast.bust}-${cast.west}-${cast.hip} (${cast.cup})`,
        image: cast.castImage,
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      script.id = 'structured-data-cast';

      const existing = document.getElementById('structured-data-cast');
      if (existing) {
        existing.remove();
      }

      document.head.appendChild(script);
    }
  }, [cast]);

  useEffect(() => {
    if (!castId) return;

    const fetchCastData = async () => {
      try {
        // キャッシュバスティング用のタイムスタンプを追加
        const timestamp = Date.now();
        const dataPath = `/cast/${shop}/${castId}/details.json?t=${timestamp}`;

        const response = await fetch(dataPath);
        if (!response.ok) {
          throw new Error('キャスト情報が見つかりません');
        }

        const data = await response.json();
        setCast(data);
        setError(false);
      } catch {
        setCast(null);
        setError(true);
      }
    };

    fetchCastData();
  }, [castId, shop]);

  //ページ読み込み時にバックグラウンド処理でユーザーアクセス情報をログに保存する
  useEffect(() => {
    if (!castId) return;

    // 重複実行を防ぐためのフラグをチェック
    const key = `access_tracked_${shop}_${castId}`;
    if (sessionStorage.getItem(key)) return;
    const pageId = 'castProfile';
    trackPageAccess(shop, pageId);
    //キャストアクセスカウンター
    trackCastAccess(castId);
    // フラグを設定（ページリロード時にリセットされる）
    sessionStorage.setItem(key, 'true');
  }, [castId, shop]);
  //ページ読み込み時にバックグラウンド処理でユーザーアクセス情報をログに保存する

  useEffect(() => {
    // typeごとにcastOrderを切り替える
    if (type === 'ranking') {
      // ランキング用のcastOrderをセット
    } else if (type === 'newface') {
      // 新人用のcastOrderをセット
    }
  }, [type]);

  if (!castId) return <p>キャストIDが指定されていません。</p>;
  if (error) return <p>キャスト情報が見つかりません。</p>;
  if (!cast) return <p>読み込み中...</p>;

  const gradeClassName =
    cast?.gradeId && gradeMap[cast.gradeId]
      ? gradeMap[cast.gradeId].className
      : '';
  return (
    <>
      <ProfileContainerHead />
      <section
        className={clsx(styles.containerContents, styles[activeStoreClass])}
      >
        <div
          className={clsx(
            styles.itemHeadImage,
            gradeClassName && styles[gradeClassName]
          )}
        >
          {cast.gradeId >= 1 && cast.gradeId <= 8 && (
            <div className={styles.gradeFrame}></div>
          )}
          <Image
            src={
              cast.profileImages && cast.profileImages.length > 0
                ? cast.profileImages[0]
                : `/images/cast/${shop}/no-image.webp`
            }
            alt={`${cast.castName}の画像1`}
            width={580}
            height={773}
          />
        </div>
        <div
          className={clsx(
            styles.boxProfile,
            gradeClassName && styles[gradeClassName]
          )}
        >
          <div className={styles.wrapHead}>
            <div className={styles.innerBadge}>
              {/* 新人さん or 体験入店（どちらか一方） */}
              {cast.badges?.includes('trial') ? (
                <span className={`${styles.labelBadge} ${styles.badgeTrial}`}>
                  体験入店
                </span>
              ) : cast.badges?.includes('new') ? (
                <span className={`${styles.labelBadge} ${styles.badgeNew}`}>
                  新人さん
                </span>
              ) : null}
              {/* 人気急上昇は常に表示 */}
              {cast.badges?.includes('spotlight') && (
                <span className={`${styles.labelBadge} ${styles.badgeHot}`}>
                  人気急上昇
                </span>
              )}
            </div>
            <div className={styles.castName}>
              {cast.castName}
              <span>{cast.castNameEn}</span>
              {String(cast.ranking) !== '' && (
                <div className={styles.itemRanking}>
                  <Image
                    src={`/images/rank/rank${String(cast.ranking).padStart(2, '0')}.webp`}
                    alt={`ランキング${cast.ranking}`}
                    width={50}
                    height={50}
                  />
                </div>
              )}
            </div>
            <div className={styles.wrapSize}>
              <span className={styles.age}>{cast.age}</span>
              <div className={styles.size}>
                <span className={styles.tall}>{cast.tall}</span>
                <span className={styles.bust}>
                  {cast.bust}
                  <i>{cast.cup}</i>
                </span>
                <span className={styles.west}>{cast.west}</span>
                <span className={styles.hip}>{cast.hip}</span>
              </div>
            </div>
            <ul className={styles.listType}>
              {cast.type.map((typeId, i) => {
                const label = typeLabels[typeId];
                return label ? <li key={i}>{label}</li> : null;
              })}
            </ul>
          </div>
          <div className={styles.itemRank}>
            <span className={styles.title}>rank:</span>
            <span className={styles.label}>
              {gradeMap[cast.gradeId]?.label}
            </span>
          </div>
          {cast.ratings && cast.ratings.length > 0 && (
            <ul className={styles.ratingList}>
              {cast.ratings.map((item, index) => (
                <li key={index}>
                  <span className={styles.label}>
                    <i></i>
                    {item.label}
                  </span>
                  <div className={styles.bar}>
                    {[...Array(7)].map((_, i) => (
                      <span
                        key={i}
                        className={clsx(
                          styles.barBlock,
                          i < item.score ? styles.active : styles.inactive
                        )}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.boxQuestions}>
          <ul>
            {cast.questions?.map((item, index) => (
              <li key={index}>
                <span className={styles.labelQuestion}>{item.question}</span>
                <span className={styles.labelAnswer}>{item.answer}</span>
              </li>
            ))}
          </ul>
          <nav className={styles.wrapLink}>
            <ExternalLink href={mailUrl} className={styles.linkMail}>
              <span>PLATINUM MAIL</span>
              <h2>プラチナメール</h2>
              <p>登録はこちらから</p>
            </ExternalLink>
            {cast.photoBlogUrl && (
              <ExternalLink
                href={cast.photoBlogUrl}
                className={styles.photoBlog}
              >
                <span>PHOTO BLOG</span>
                <h2>写メ日記</h2>
              </ExternalLink>
            )}
          </nav>
        </div>
        <div className={clsx(styles.itemImage, styles.main02)}>
          <Image
            src={
              cast.profileImages && cast.profileImages.length > 1
                ? cast.profileImages[1]
                : `/images/cast/${shop}/no-image.webp`
            }
            alt={`${cast.castName}の画像1`}
            width={580}
            height={773}
          />
        </div>
        <div className={styles.boxSchedule}>
          <span className={styles.sidebarH2}>schedule</span>
          <h2 className={styles.itemH2}>週間スケジュール</h2>
          {cast && <CastSchedule castId={cast.castId} shop={shop} />}
          {cast.reservationUrl && (
            <ExternalLink
              href={cast.reservationUrl}
              className={styles.linkReservation}
            >
              <h3>ご予約はこちら</h3>
              <p>{cast.castName}さんの予約状況を確認</p>
            </ExternalLink>
          )}
        </div>
        <div className={clsx(styles.itemImage, styles.main03)}>
          <Image
            src={
              cast.profileImages && cast.profileImages.length > 2
                ? cast.profileImages[2]
                : `/images/cast/${shop}/no-image.webp`
            }
            alt={`${cast.castName}の画像1`}
            width={580}
            height={773}
          />
        </div>
        <div className={styles.boxCastMessage}>
          <div className={styles.boxInner}>
            <span className={styles.sidebarH2}>cast message</span>
            <h2 className={styles.itemH2}>メッセージ</h2>
            <div className={styles.wrapCastMessage}>
              {cast.castMessage && (
                <div
                  className={styles.castMessage}
                  dangerouslySetInnerHTML={{
                    __html: convertRemToPx(cast.castMessage),
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {cast.profileImages?.slice(5, 8).filter(Boolean).length > 0 && (
          <div className={styles.wrapImageMiddle}>
            {[5, 6, 7].map((i, idx) => {
              const src = cast.profileImages[i];
              return (
                <Image
                  key={idx}
                  src={src ? src : `/images/cast/${shop}/no-image.webp`}
                  alt={`${cast.castName}の画像${i + 1}`}
                  width={580}
                  height={773}
                />
              );
            })}
          </div>
        )}
        <div className={styles.boxShopComment}>
          <div className={styles.boxInner}>
            <span className={styles.sidebarH2}>SHOP COMMENT</span>
            <h2 className={styles.itemH2}>ショップコメント</h2>
            <div className={styles.wrapShopComment}>
              {cast.shopComment && (
                <div
                  className={styles.shopComment}
                  dangerouslySetInnerHTML={{
                    __html: convertRemToPx(cast.shopComment),
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className={clsx(styles.itemImage, styles.main04)}>
          <Image
            src={
              cast.profileImages && cast.profileImages.length > 3
                ? cast.profileImages[3]
                : `/images/cast/${shop}/no-image.webp`
            }
            alt={`${cast.castName}の画像1`}
            width={580}
            height={773}
          />
        </div>
        <div className={styles.wrapImageBottom}>
          <div className={styles.itemImageFirst}>
            <Image
              src={
                cast.profileImages && cast.profileImages.length > 4
                  ? cast.profileImages[4]
                  : `/images/cast/${shop}/no-image.webp`
              }
              alt={`${cast.castName}の画像1`}
              width={580}
              height={773}
            />
          </div>
          {cast.profileImages?.slice(8, 9).filter(Boolean).length > 0 && (
            <div className={styles.itemImageBottom}>
              {[8, 9].map((i, idx) => {
                const src = cast.profileImages[i];
                return (
                  <Image
                    key={idx}
                    src={src ? src : `/images/cast/${shop}/no-image.webp`}
                    alt={`${cast.castName}の画像${i + 1}`}
                    width={580}
                    height={773}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.boxReview}>
          <div className={styles.boxInner}>
            <span className={styles.sidebarH2}>REVIEW</span>
            <h2 className={styles.itemH2}>お客様の声</h2>
            <CastReviewList castId={cast.castId} shop={shop} />
            <CastReviewForm />
          </div>
        </div>
        {cast.movie && (
          <div className={styles.boxMovie}>
            <div className={styles.itemMovie}>
              <video
                src={cast.movie}
                controls
                preload="metadata"
                width="100%"
                height="auto"
              />
            </div>
          </div>
        )}
        <div className={styles.boxCastNav}>
          <nav>
            {prevCastId ? (
              <Link
                href={`/${shop}/profile?id=${prevCastId}&type=${type}${type === 'ranking' && rankingType ? `&rankingType=${rankingType}` : ''}`}
                className={styles.linkCastDetail}
              >
                {prevCastName}
                <br className="sp" />
                さんのページへ
              </Link>
            ) : (
              <div></div>
            )}
            <Link href={`/${shop}/cast/`} className={styles.linkCastList}>
              在籍一覧へ
            </Link>
            {nextCastId ? (
              <Link
                href={`/${shop}/profile?id=${nextCastId}&type=${type}${type === 'ranking' && rankingType ? `&rankingType=${rankingType}` : ''}`}
                className={styles.linkCastDetail}
              >
                {nextCastName}
                <br className="sp" />
                さんのページへ
              </Link>
            ) : (
              <div></div>
            )}
          </nav>
        </div>
      </section>
    </>
  );
}
