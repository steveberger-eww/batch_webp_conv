// utils/imageConverter.ts
import axios from "axios";

const convertToWebp = async (imageBuffer: Buffer): Promise<Buffer> => {
  try {
    const response = await axios.post("http://localhost:3001/convertToWebp", {
      imageBuffer: imageBuffer.toString("base64"),
    });

    return Buffer.from(response.data.webpBuffer, "base64");
  } catch (error) {
    console.error("Error converting to WebP:", error);
    throw error;
  }
};

export default convertToWebp;
