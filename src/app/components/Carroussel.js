"use client";
//import { useState } from "react";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

import { useRouter } from "next/navigation";
import ImageGallery from "react-image-gallery";

export default function Carroussel({ images }) {
  const router = useRouter();

  function handleClick(e) {
    const currentImage = images.filter(
      (image) => image.itinerary_image_url === e.target.src
    )[0];
    console.log(currentImage);
    router.push(`/itinerary/${currentImage.itinerary_id}`);
  }

  const mappedImages = images
    .map((image) => ({
      original: image.itinerary_image_url,
      thumbnail: image.itinerary_image_url,
    }))
    .filter((img) => img.original !== null);

  return (
    <>
      {/* <div className=' head_text orange_gradient text-center pb-4 '>
        Explore{" "}
      </div> */}
      <div className='max-w-full mx-auto mb-24 mt-10'>
        <ImageGallery onClick={handleClick} items={mappedImages} showFullscreenButton={false}/>
      </div>
    </>
  );
}
