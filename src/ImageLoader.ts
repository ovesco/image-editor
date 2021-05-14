import PixelMatrix from "./model/PixelMatrix";

class ImageLoader {

  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
  }

  async loadFromUrl(url: string): Promise<PixelMatrix> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const { naturalWidth, naturalHeight } = img;

        // Build canvas object
        this.canvas.width = naturalWidth;
        this.canvas.height = naturalHeight;

        this.context.clearRect(0, 0, naturalWidth, naturalHeight);
        this.context.drawImage(img, 0, 0);

        try {
          const imageData = this.context.getImageData(0, 0, naturalWidth, naturalHeight);
          const pixelMatrix = new PixelMatrix([...imageData.data], imageData.width, imageData.height);
          resolve(pixelMatrix);
        } catch (e) {
          reject(e);
        }
      };

      img.onerror = (e) => reject(e);

      img.src = url;
    });
  }
}

export default ImageLoader;