import Image from 'next/image'

const Gallery = () => {
  return (
    <div className='mx-auto container py-14 h-full'>
      <div className='flex flex-wrap md:-m-2'>
        <div className='flex w-1/2 flex-wrap'>
          <div className='w-1/2 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/hero1.avif'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/2 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/hero2.avif'
              width={200}
              height={200}
            />
          </div>
          <div className='w-full p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/hero3.avif'
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className='flex w-1/2 flex-wrap'>
          <div className='w-full p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/hero4.avif'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/2 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/hero5.avif'
              width={200}
              height={200}
            />
          </div>
          <div className='w-1/2 p-1 md:p-2 h-48'>
            <Image
              alt='gallery'
              className='img'
              src='/images/hero2.avif'
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery