'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { AiFillDelete, AiFillCheckCircle } from 'react-icons/ai';
export default function Home() { 
  const [images, setImages] = useState([
    '/image-1.webp',
    '/image-2.webp',
    '/image-3.webp',
    '/image-4.webp',
    '/image-5.webp',
    '/image-6.webp',
    '/image-7.webp',
    '/image-8.webp',
    '/image-9.webp',
    '/image-10.webp',
    '/image-11.webp',
  ]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [checkboxState, setCheckboxState] = useState({});

  // Get images from localStorage
  // useEffect(() => {
  //   const storedImages = JSON.parse(localStorage.getItem('galleryImages'));
  //   if (storedImages) {
  //     setImages(storedImages);
  //   }
  // }, []); 
// Drag Index
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    setDraggedIndex(index);
  };
// Dragging the Image
  const handleDragOver = (e, index) => {
    e.preventDefault();

    const imagesCopy = [...images];
    const draggedImage = imagesCopy[draggedIndex];
    imagesCopy.splice(draggedIndex, 1);
    imagesCopy.splice(index, 0, draggedImage);

    setImages(imagesCopy);
    setDraggedIndex(index);
  };
//  Finding Existing Image
  const isImageExists = (newImage) => {
    return images.some((image) => image === newImage);
  };
  // Upload Random Image as user want
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const newImage = e.target.result;
        console.log("newImage",[newImage]);
        // Uploading Image and giving alart for Existing Image
        if (!isImageExists(newImage)) {
          setImages((prevImages) => [...prevImages, newImage]);
          const updatedImages = [...images, newImage];
          // Also store Image in localStorage
          localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
        } else {
          alert('Image already exists in the gallery.');
        }
      };
      reader.readAsDataURL(file);
    }
  };
  // Selecting Images
  const handleImageSelect = (image, isChecked) => {
    if (isChecked) {
      setSelectedImages([...selectedImages, image]);
    } else {
      const updatedSelectedImages = selectedImages.filter(
        (selectedImage) => selectedImage !== image
        );
        setSelectedImages(updatedSelectedImages);
      }
      setCheckboxState((prevState) => ({
        ...prevState,
        [image]: isChecked,
      }));
    };
    // Deleting Images
  const handleDeleteSelected = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image)
    );
    setImages(updatedImages);
    setSelectedImages([]);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages))
  };
  return (
    <main className='w-auto md:w-3/4 lg:w-3/5 mx-4 md:m-auto mt-5 rounded-xl bg-white'>
      <div className='p-4 border-b-4 border-slate-200'>
        {
          selectedImages.length > 0
          ?
           <div className='flex justify-between items-center'>
             <h2 className='heading'>
              <AiFillCheckCircle/>
                <span>{selectedImages.length}</span>
               Images Selected</h2>
             <button onClick={handleDeleteSelected} class="delete_btn">
             <AiFillDelete className='blt_icon'/>
            </button>
           </div>
          :
          <h2 className='heading'>Gallery</h2>
        }
        </div>
      <div className="gallery_main">
      {images.map((image, index) => (
        <div
          key={index}
          className={`image_items ${selectedImages.includes(image) && 'selected_img'} ${index === draggedIndex ? 'dragging' : ''}`}
          onDragOver={(e) => handleDragOver(e, index)}
        >
             <div className='relative'
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
             >
             <input
              className='checkbox'
                type="checkbox"
                onChange={(e) => handleImageSelect(image, e.target.checked)}
                checked={checkboxState[image] || false}
                id={`${image}`}
              />
             <label htmlFor={`${image}`}>
              <Image
              width={100}
              height={100}
              layout='responsive'
              src={image}
              alt={`Image ${index + 1}`}
              />
              </label>
             </div>
        </div>
      ))}
      <div className='upload_btn'>
        <label className='upload_label'>
          <BsCardImage/>
          Add Images
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageUpload}
          className='opacity-0 hidden'
        />
      </label>
      </div>
    </div>
    </main>
  )
}