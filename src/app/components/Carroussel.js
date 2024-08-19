"use client";
//import { useState } from "react";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
//import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { useRouter } from "next/navigation";
import ImageGallery from "react-image-gallery";

export default function Carroussel({ images }) {
  const itineraryId = images.map((image) => image.itinerary_id);
  console.log(itineraryId);
  const router = useRouter();
  console.log(itineraryId);
  function handleClick() {
    router.push(`/itinerary/${images.itinerary_id}`);
  }

  const mappedImages = images
    .map((image) => ({
      original: image.itinerary_image_url,
      thumbnail: image.itinerary_image_url, // Assuming the same URL works for thumbnails; adjust if needed
    }))
    .filter((img) => img.original !== null);
  // const [slide, setSlide] = useState(0);
  // const nextSlide = () => {
  //   setSlide(slide + 1);
  // };
  // const previousSlide = () => {
  //   setSlide(slide - 1);
  // };

  return (
    <>
      <div className='head_text orange_gradient text-center pb-4'>Explore </div>
      {/* <div className='flex flex-row max-w-fit max-h-fit mb-40'> */}
      <ImageGallery onClick={handleClick} items={mappedImages} />
      {/* <SlArrowLeft
          onClick={previousSlide}
          className='hover:bg-sky-700 items-center left-7 absolute h-24 w-24'
        />
        
        {images.map((image, idx) => {
          return (
            <img
              src={image.itinerary_image_url}
              key={idx}
              className={slide === idx ? "visible" : "invisible"}></img>
          );
        })}
        <SlArrowRight
          onClick={nextSlide}
          className='hover:bg-sky-700 align-middle right-7 absolute h-24 w-24'
        /> */}
      {/* </div> */}
    </>
  );
}
