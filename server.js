// server.js
const express = require("express");
const sharp = require("sharp");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json({ limit: "25MB" }));
app.use(cors());

app.post("/convertToWebp", async (req, res) => {
  try {
    const { imageBuffer } = req.body;

    const isSupportedFormat = await sharp(Buffer.from(imageBuffer, "base64"))
      .metadata()
      .then(() => true)
      .catch(() => false);

    if (!isSupportedFormat) {
      console.error("Unsupported image format");
      return res
        .status(400)
        .json({ success: false, error: "Unsupported image format" });
    }

    // Proceed with the conversion
    const webpBuffer = await sharp(Buffer.from(imageBuffer, "base64"))
      .toFormat("webp")
      .toBuffer();

    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.json({ success: true, webpBuffer: webpBuffer.toString("base64") });
  } catch (error) {
    console.error("Error converting to WebP:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
