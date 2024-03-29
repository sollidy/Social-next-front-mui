import { Skeleton, Typography } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import userPlaceholder from '../../../shared/img/avatar.png'
import styles from './ProfileHeader.module.scss'
import { ProfileHeaderProps } from './ProfileHeader.props'

export const ProfileHeader = ({
  userData,
  isLoading,
  children,
  ...rest
}: ProfileHeaderProps) => {
  const isSkeleton = isLoading || !userData

  return (
    <div className={clsx(styles.profileHeader, 'boxWhite')} {...rest}>
      {isSkeleton ? (
        <>
          <Skeleton variant="circular" width={150} height={150} />
          <div className={styles.infoBlock} style={{ maxWidth: '280px' }}>
            <Skeleton height={40} />
            <Skeleton />
          </div>
          <Skeleton variant="rounded" width={116} height={35} />
        </>
      ) : (
        <>
          <Image
            src={userData.profile.photo ?? userPlaceholder}
            alt="User photo"
            width={150}
            height={150}
            className={styles.img}
            priority
          />
          <div className={styles.infoBlock}>
            <Typography variant="h6">{userData.name}</Typography>
            <Typography
              variant="body2"
              sx={{ textTransform: 'uppercase', fontSize: 13 }}
            >
              {userData.profile.status ?? 'Empty status'}
            </Typography>
          </div>
          <div className={styles.button}>{children}</div>
        </>
      )}
    </div>
  )
}
