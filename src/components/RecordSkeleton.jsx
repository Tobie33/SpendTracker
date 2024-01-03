import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const RecordSkelton = () => {

  return(
    <div id="skeleton-page">
      <div id="record-detail" className='my-10'>
        <Skeleton width={200} height={50} />
        <Skeleton width={200} height={50} />
      </div>
      <div className='flex'>
        <div className='me-3'>
          <Skeleton width={180} height={50} />
        </div>
        <div>
          <Skeleton width={180} height={50} />
        </div>
      </div>
    </div>
  )
}

export default RecordSkelton
