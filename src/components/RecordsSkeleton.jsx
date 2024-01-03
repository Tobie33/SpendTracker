import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const RecordsSkelton = () => {

  return(
    <main id="skeleton-page" className='m-3 w-full'>
      <div id="upper-section" className='flex'>
        <div id="balance-buttons" className='w-3/6'>
          <div>
            <Skeleton width={300} height={50}/>
          </div>
          <div className='mt-20 ms-5'>
            <Skeleton width={150} height={30}/>
          </div>
        </div>
        <div id="circular" className="h-80 flex justify-center w-3/6">
          <Skeleton circle height={320} width={320}/>
        </div>
      </div>
      <div id="cards" className='mt-3'>
        <Skeleton height={50} count={7} className='grow'/>
      </div>
    </main>
  )

}

export default RecordsSkelton
