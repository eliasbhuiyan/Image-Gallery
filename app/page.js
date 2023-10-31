'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
export default function Home() {
  // const [images, setImages] = useState([
    //   '/image-1.webp',
    //   '/image-2.webp',
    //   '/image-3.webp',
  //   '/image-4.webp',
  //   '/image-5.webp',
  //   '/image-6.webp',
  //   '/image-7.webp',
  //   '/image-8.webp',
  //   '/image-9.webp',
  //   '/image-10.webp',
  //   '/image-11.webp',
  // ]);
  
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  console.log("images",images);
  useEffect(() => {
    // Load images from local storage on component mount
    const storedImages = JSON.parse(localStorage.getItem('galleryImages'));
    if (storedImages) {
      setImages(storedImages);
    }
  }, []); 
 

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    
    if (draggedIndex === null || index === draggedIndex) {
      return;
    }
    
    const imagesCopy = [...images];
    const draggedImage = imagesCopy[draggedIndex];
    
    imagesCopy.splice(draggedIndex, 1);
    imagesCopy.splice(index, 0, draggedImage);
    
    setImages(imagesCopy);
    setDraggedIndex(index);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
  };
  
  const isImageExists = (newImage) => {
    return images.some((image) => image === newImage);
  };
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const newImage = e.target.result;
        console.log("newImage",[newImage]);
        
        if (!isImageExists(newImage)) {
          setImages((prevImages) => [...prevImages, newImage]);
          const updatedImages = [...images, newImage];
          localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
        } else {
          alert('Image already exists in the gallery.');
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleImageSelect = (image, isChecked) => {
    if (isChecked) {
      setSelectedImages([...selectedImages, image]);
    } else {
      const updatedSelectedImages = selectedImages.filter(
        (selectedImage) => selectedImage !== image
      );
      setSelectedImages(updatedSelectedImages);
    }
  };

  const handleDeleteSelected = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  return (
    <main className='w-3/5 m-auto bg-white'>
      <div className='p-4 border-b-4 border-slate-200 flex justify-between'>
        <h2>Gallery</h2>
        <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
      <div className="image-gallery">
      {images.map((image, index) => (
        <div
          key={index}
          className={`image-container relative ${index === draggedIndex ? 'dragging' : ''}`}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={handleDrop}
        >
          <input
          className='checkbox'
            type="checkbox"
            onChange={(e) => handleImageSelect(image, e.target.checked)}
          />
          <Image
          width={100}
          height={100}
          layout='responsive'
            src={image}
            alt={`Image ${index + 1}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
          />
        </div>
      ))}
      <div className='border-dotted border-2 border-slate-600'>
        <label className='w-full h-full cursor-pointer gap-4 font-semibold text-lg flex flex-col justify-center items-center'>
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
