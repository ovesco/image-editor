import CanvasContext from './CanvasDescriptor';
import ImageLoader from './ImageLoader';
import Layer from './model/Layer';
import paintPixelsMatrix from './painters/PixelsMatrixPainter';
const loader = new ImageLoader();

(async () => {
  const canvas = document.querySelector('#drawing') as HTMLCanvasElement;
  const context = new CanvasContext(canvas);
  const loadedImage = await loader.loadFromUrl('https://www.adorama.com/alc/wp-content/uploads/2018/11/shutterstock_1200681070.jpg');

  const layer = new Layer(loadedImage);
  paintPixelsMatrix(layer, context);
}) ();