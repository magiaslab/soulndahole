import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface SponsorImage {
  src: string;
  alt: string;
}

interface SponsorGalleryProps {
  images: SponsorImage[];
}

const SponsorGallery: React.FC<SponsorGalleryProps> = ({ images }) => {
  const [index, setIndex] = useState(-1);

  const slides = images.map(({ src, alt }) => ({ src, title: alt }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <div className="rounded-lg border-2 border-[rgba(201,162,39,0.25)] bg-black shadow-lg hover:shadow-xl hover:border-[#c9a227] transition-all duration-300 transform hover:scale-[1.02] overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Zoom]}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: "rgba(10, 10, 10, 0.85)" } }}
      />
    </>
  );
};

export default SponsorGallery; 