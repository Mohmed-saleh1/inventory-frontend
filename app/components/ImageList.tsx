import Image from "next/image";

const images = [
  "/Roshdy.png",
  "/Roshdy.png",
  "/Roshdy.png",
  "/Roshdy.png",
];

const ImageList = () => {
  return (
    <div className="mt-6 shadow-lg px-10 pt-4 rounded-2xl w-[210px] min-h-[670px] h-[670px] overflow-y-scroll">
      {images.map((src, index) => (
        <div key={index} className="mb-4">
          <Image
            src={src}
            alt={`Image ${index + 1}`}
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
