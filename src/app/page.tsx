"use client";
import Image from "next/image";
import { useState } from "react";
import { Navigation } from "./components/Navbar/Navbar";
import FileUpload from "./components/Fileupload/Fileupload";
import convertToWebp from "./components/imageConverter/ImageConverter";

const Home: React.FC = () => {
  const [webpImages, setWebpImages] = useState<
    { name: string; webpBuffer: Buffer }[]
  >([]);

  const handleUpload = async (acceptedFiles: File[]) => {
    const webpBuffer = await convertToWebp(
      await acceptedFiles[0].arrayBuffer()
    );
    setWebpImages([{ name: "Converted Image", webpBuffer }, ...webpImages]);
  };

  return (
    <main>
      <div>
        <Navigation />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4 text-center my-20 ">
          WebP Image Batchinger
        </h1>
        <FileUpload onUpload={handleUpload} />
        {webpImages.map((image, index) => (
          <div key={index} className="mt-4">
            <p className="font-bold">{image.name}</p>
            <img
              src={`data:image/webp;base64,${image.webpBuffer.toString(
                "base64"
              )}`}
              alt={image.name}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
