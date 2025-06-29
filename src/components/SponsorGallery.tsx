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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {images.map((img, i) => (
          <div
            key={i}
            className={
              `group relative cursor-pointer ` +
              (i === 0
                ? 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4'
                : '')
            }
            style={i === 0 ? { gridColumn: 'span 1 / span 1', gridColumnEnd: 'span 4' } : {}}
            onClick={() => setIndex(i)}
          >
            <div className={
              `bg-white rounded-lg ${i === 0 ? 'p-2 md:p-4 border-2 md:border-4' : 'p-2 border-2'} border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={i === 0 ? "w-full h-auto object-contain" : "w-full h-auto object-contain"}
                style={i === 0 ? { maxHeight: 320 } : { maxHeight: 200 }}
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