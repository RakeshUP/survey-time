import axios from 'axios';
import sharp from 'sharp';

const generateThumbnail = async ({ query: { imageUrl } }, res, next) => {
  try {
    const { data: imageBuffer } = await axios({ url: imageUrl, responseType: 'arraybuffer' });
    sharp(imageBuffer, { format: 'png' })
      .resize(50, 50)
      .toBuffer()
      .then((data) => {
        res.set('Content-Type', 'image/png');
        res.send(data);
      })
      .catch((err) => next(err.toString()));
  } catch (err) {
    next(err.message);
  }
};

export default generateThumbnail;
