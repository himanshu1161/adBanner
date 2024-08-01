import React from "react";

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

interface BannerImageCompProps {
  banner: Banner;
  onEdit: (banner: Banner) => void;
  showEdit: boolean;
  adImage?: string;
}

const BannerImageComp: React.FC<BannerImageCompProps> = ({ banner, onEdit, showEdit, adImage }) => {
  const isOdd = banner.id % 2 !== 0;
  const formattedTitle = isOdd
    ? banner.title.replace("Leads", "<br/>Leads")
    : banner.title;

  const widthImage = showEdit ? "w-[30rem] h-[28rem]" : "w-[30rem] h-[20rem]";

  return (
    <div className={`relative shadow-lg overflow-hidden m-2 z-10`}>
      <div className="relative">
        <img
          src={showEdit ? banner.adImage : adImage}
          alt=""
          className={`${widthImage} object-cover absolute inset-0 z-0`}
        />
        <img
          src={banner.image}
          alt={banner.title}
          className={`${widthImage}  object-cover bg-transparent opacity-100 relative z-10`}
        />
      </div>
      <div className="absolute inset-0 bg-opacity-50 p-4 flex flex-col justify-between pt-14 z-20 ml-4">
        <div>
          <h2 className={`text-xl font-bold ${banner.textColor}`}>
            {isOdd ? (
              <span dangerouslySetInnerHTML={{ __html: formattedTitle }} />
            ) : (
              banner.title
            )}
          </h2>
          <p className={`mt-2 ${banner.textColor}`}>{banner.description}</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <button
            className={`px-4 py-2`}
            style={{ backgroundColor: `${banner.ctaBgColor}`, color: `${banner.ctaTextColor}` }}
          >
            {banner.cta}
          </button>
        </div>
      </div>
      {showEdit &&
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="15"
        fill="none"
        className="text-white cursor-pointer absolute top-4 right-3 z-30 hover:text-black transition duration-300"
        onClick={() => onEdit(banner)}
      >
        <path
          fill="currentColor"
          d="M10.898 1.297a1.766 1.766 0 0 1 2.489 0l1.066 1.066a1.766 1.766 0 0 1 0 2.489l-1.312 1.312L9.586 2.61zM8.957 3.238l3.555 3.555-6.371 6.371a2.4 2.4 0 0 1-1.012.602l-3.309.984a.62.62 0 0 1-.629-.191.56.56 0 0 1-.164-.63l.957-3.308c.11-.383.329-.738.602-1.012z"
        ></path>
      </svg>}
    </div>
  );
};

export default BannerImageComp;
