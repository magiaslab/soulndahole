import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export const CLOUDINARY_CONFIG = {
  videoUrl: "https://res.cloudinary.com/magiaslabcdn/video/upload/v1746542211/assets/soulndahole/trailer_2025_ti3sbc.mp4"
} as const;

export const getVideoUrl = () => CLOUDINARY_CONFIG.videoUrl; 