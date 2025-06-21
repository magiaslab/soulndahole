import * as React from "react";
import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

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

export default function Gallery({ images }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
    });
  }, []);

  const slides = images.map(({ src, width, height, alt }) => ({
    src,
    width,
    height,
    alt,
  }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, i) => (
          <div
            key={i}
            className="group relative cursor-pointer"
            data-aos="zoom-in"
            onClick={() => setIndex(i)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="rounded-lg w-full h-full object-cover border-2 border-gray-800 group-hover:border-red-600 transition-all duration-300"
            />
          </div>
        ))}
      </div>

      <Lightbox
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        index={index}
        plugins={[Thumbnails, Zoom]}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
} 