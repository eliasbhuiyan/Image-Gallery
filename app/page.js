import Image from 'next/image'
import { BsCardImage } from 'react-icons/bs';
export default function Home() {
  return (
    <main>
      <h1>Welcome to the Image-Gallery</h1>
      <div className=' w-2/4 bg-white m-auto'>
        <div className='p-4 border-b-2 border-slate-400'>
            <div>
              <h2>Gallery</h2>
            </div>
        </div>
        <div className='p-4'>
        <div className="gallery">
          <div id="item-0">
            <Image src="/image-1.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-1">
            <Image src="/image-2.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-2">
            <Image src="/image-3.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-3">
            <Image src="/image-4.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-4">
            <Image src="/image-5.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-5">
            <Image src="/image-6.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-6">
            <Image src="/image-7.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-7">
            <Image src="/image-8.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-8">
            <Image src="/image-9.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-9">
            <Image src="/image-10.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-10">
            <Image src="/image-11.webp" width={100} height={100} layout='responsive'/>
          </div>
          <div id="item-11">
            <label className='w-full h-full flex flex-col justify-center items-center font-bold'>
                <BsCardImage/>
                <p>Add Images</p>
                <input className='opacity-0' type="file"/>
            </label>
          </div>
        </div>
        </div>
      </div>
    </main>
  )
}
