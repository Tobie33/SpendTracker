import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


const DashboardSkeleton = () => {
  return(
    <div id="dashboard-page" className="m-3">
      <div className='flex'>
        <div id="balance-amount">
          <Skeleton width={200} height={50}/>
        </div>
        <div id="balance-circular" className="h-80 flex justify-center">
          <Skeleton circle height={320} width={320}/>
        </div>
      </div>
      <div id="income-expense" className="flex my-10">
        <div id="income">
          <Skeleton width={200} height={50} />
        </div>
        <div id="expense" className='px-3'>
          <Skeleton width={200} height={50} />
        </div>
      </div>
      <div className='flex'>
        <div className='record-cards'>
          <Skeleton height={50} count={7} className='grow'/>
        </div>
        <div className='record-cards px-3'>
          <Skeleton height={50} count={7} className='grow'/>
        </div>
      </div>
    </div>
  )
}

export default DashboardSkeleton
