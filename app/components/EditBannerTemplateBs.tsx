import React, { useState, useEffect } from 'react';
import BannerImageComp from './BannerImageComp';

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

interface Props {
  banner: Banner;
  onSave: (banner: Banner) => void;
  onClose: () => void;
  imgBanner: { adImage: string }[];
}


const EditBannerTemplateBs: React.FC<Props> = ({ banner, onSave, onClose, imgBanner }) => {
  const [title, setTitle] = useState(banner.title);
  const [description, setDescription] = useState(banner.description);
  const [cta, setCta] = useState(banner.cta);
  const [image, setImage] = useState(banner.image);
  const [background, setBackground] = useState(banner.background);
  const [adImage, setAdImage] = useState(banner.adImage);
  const [isVisible, setIsVisible] = useState(false);

  const showEdit = false;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSave = () => {
    onSave({ ...banner, title, description, cta, image, background, adImage });
    onClose();
  };

  const isOdd = banner.id % 2 !== 0;
  const formattedTitle = isOdd
    ? banner.title.replace("Leads", "<br/>Leads")
    : banner.title;

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white p-6 rounded-lg w-full max-w-[425px] relative h-[80vh] overflow-y-auto transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-10'}`}>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl mb-4 text-gray-600">Edit Banner</h2>
        <div className="mb-4">
          <>
          <BannerImageComp key={banner.id} banner={banner} showEdit={showEdit} adImage={adImage} onEdit={() => console.log('Edit button clicked')}/>
          </>
          <div className='pt-2'><span className='text-sm text-gray-600'>Image Attribution: Photo by Erwan Hesry on Unsplash</span></div>
        </div>
        <div className="flex items-center mb-4 space-x-2">
          <div className="w-14 h-14 rounded-full border flex items-center justify-center relative mb-2">
            <input
              type="file"
              className="opacity-0 absolute w-14 h-14 cursor-pointer"
              onChange={(e) => {
                const file = e.target?.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const result = reader.result;
                    if (typeof result === 'string') {
                      setImage(result);
                      setAdImage(result)
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <span className="text-sm text-gray-500">Upload</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {imgBanner.map((img, idx) => (
              <img
                key={idx}
                src={img.adImage}
                alt={`Option ${idx + 1}`}
                className="w-14 h-14 rounded-full border object-cover cursor-pointer"
                onClick={() => setAdImage(img.adImage)}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <input
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Button Text</label>
          <input
            className="w-full p-2 border rounded"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            placeholder="Button Text"
          />
        </div>
        <div className="flex">
          <button
            className="bg-[#2B4A47] text-white text-bold px-4 py-2 rounded w-full"
            onClick={handleSave}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBannerTemplateBs;
