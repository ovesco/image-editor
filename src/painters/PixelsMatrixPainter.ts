import PixelMatrix from '../model/PixelMatrix';
import { Painter } from './Painter';

const PixelsMatrixPainter: Painter<PixelMatrix> = (layer, context) => {

  const pixelMatrix = layer.getData();
  const [x, y] = layer.position;
  const pixelData = pixelMatrix.getRawData();
  console.log(x, y);
  const dataImage = new ImageData(new Uint8ClampedArray(pixelData), pixelMatrix.width, pixelMatrix.height);

  context.underlyingContext.putImageData(dataImage, x, y);
};

export default PixelsMatrixPainter;