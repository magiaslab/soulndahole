import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Definiamo il tipo per le immagini che riceviamo come prop
interface Image {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [index, setIndex] = useState(-1);

  const slides = images.map(({ src, width, height, alt }) => ({
    src,
    width,
    height,
    title: alt,
  }));

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image, i) => (
          <div key={i} className="break-inside-avoid" onClick={() => setIndex(i)}>
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
            />
          </div>
        ))}
      </div>

      <Lightbox
      open={index >= 0}
      close={() => setIndex(-1)}
      index={index}
      slides={slides}
      plugins={[Captions, Thumbnails, Zoom]}
      controller={{ closeOnBackdropClick: true }} // <- RIGA DA AGGIUNGERE
      captions={{
          descriptionTextAlign: 'center',
      }}
      styles={{ 
          container: { backgroundColor: "rgba(10, 10, 10, 0.85)" },
          captionsDescription: { fontFamily: 'sans-serif' }
      }}
    />
    </>
  );
};

export default Gallery; 