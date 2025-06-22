import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

const socialLinks = [
  { 
    name: 'Instagram', 
    href: 'https://www.instagram.com/soulndahole', 
    icon: FaInstagram 
  },
  { 
    name: 'Facebook', 
    href: 'https://www.facebook.com/soulndahole', 
    icon: FaFacebook 
  },
  { 
    name: 'TikTok', 
    href: 'https://www.tiktok.com/@soulndahole', 
    icon: FaTiktok 
  },
];

const SocialIcons = () => {
  return (
    <div className="flex justify-center md:justify-start space-x-6">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-soul-gray-300 hover:text-white transition-colors"
        >
          <span className="sr-only">{social.name}</span>
          <social.icon className="h-6 w-6" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons; 