/* =======================================
 * キャスト一覧 コンポーネントアイテム
 * URL:src/components/Shop/ItemCastList.tsx
 * Referenced in: : src/app/hot/cast/page.tsx
 * Created: 2025-09-03
 * Last updated: 2025-09-03
 * ======================================= */

import styles from '@/styles/ShopCastList.module.scss';
import type { CastDetail } from '@/types/CastDetails';
import Image from 'next/image';
import Link from 'next/link';
import { gradeMap } from '@/constants/castGradeMap';
import { typeLabels } from '@/constants/castTypeLabels';
type Props = {
  cast: CastDetail;
};

const ItemCastList = ({ cast }: Props) => {
  const gradeClassName = gradeMap[cast.gradeId]?.className;

  return (
    <li key={cast.castId} className={styles.boxCast}>
      <div className={styles.wrapTodayTime}>
        {cast.startTime && cast.endTime && (
          <>
            <span>{cast.startTime}</span>
            <span>{cast.endTime}</span>
          </>
        )}
        {cast.scheduleStatus && (
          <p className={styles.scheduleStatus}>{cast.scheduleStatus}</p>
        )}
      </div>
      <Link href={cast.castUrl}>
        <div className={styles.wrapBadge}>
          {/* 新人さん or 体験入店（どちらか一方） */}
          {cast.badges?.includes('trial') ? (
            <span className={`${styles.labelBadge} ${styles.badgeTrial}`}>
              体験
              <br />
              入店
            </span>
          ) : cast.badges?.includes('new') ? (
            <span className={`${styles.labelBadge} ${styles.badgeNew}`}>
              新人
              <br />
              さん
            </span>
          ) : null}

          {/* 人気急上昇は常に表示 */}
          {cast.badges?.includes('spotlight') && (
            <span className={`${styles.labelBadge} ${styles.badgeHot}`}>
              人気
              <br />
              急上昇
            </span>
          )}
        </div>
        <div
          className={`${styles.wrapPhoto} ${gradeClassName ? styles[gradeClassName] : ''}`}
        >
          {cast.gradeId >= 1 && cast.gradeId <= 8 && (
            <div className={styles.gradeFrame}></div>
          )}
          <span className={styles.gradeLabel}>
            {gradeMap[cast.gradeId]?.label}
          </span>
          <Image src={cast.castImage} alt={cast.castName} fill />
        </div>
      </Link>
      <div className={styles.castProfile}>
        <div className={styles.wrapName}>
          <p className={styles.castName}>{cast.castName}</p>
          <span className={styles.age}>{cast.age}</span>
        </div>
        <div className={styles.castSize}>
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
    </li>
  );
};

export default ItemCastList;
