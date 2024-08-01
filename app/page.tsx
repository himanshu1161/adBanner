'use client'
import { useState, useEffect } from 'react';
import BannerImageComp from './components/BannerImageComp';
import EditBannerTemplateBs from './components/EditBannerTemplateBs';

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
  adImage: string;
  textColor: string;
  ctaBgColor: string;
  ctaTextColor: string;
}

const HomePage = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const showEdit = true;

  useEffect(() => {
    fetch('/banners.json')
      .then((response) => response.json())
      .then((data) => setBanners(data));
  }, []);

  const handleSave = (updatedBanner: Banner) => {
    setBanners(
      banners.map((banner) =>
        banner.id === updatedBanner.id ? updatedBanner : banner
      )
    );
    setEditingBanner(null);
  };

  const handleClose = () => {
    setEditingBanner(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 max-w-8xl">
        {banners.map((banner) => (
          <BannerImageComp key={banner.id} banner={banner} onEdit={setEditingBanner} showEdit={showEdit} />
        ))}
        {editingBanner && (
          <EditBannerTemplateBs
            banner={editingBanner}
            onSave={handleSave}
            onClose={handleClose}
            imgBanner={banners}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
