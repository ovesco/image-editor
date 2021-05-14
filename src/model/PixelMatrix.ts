import EventEmitter from "./EventEmitter";
import LayerElement from "./LayerElement";

export const PIXEL_MATRIX_UPDATED = 'updated';

// Format r,v,b,a just like an ImageData
type PixelsData = number[];

type Pixel = [number, number, number, number];

class PixelMatrix extends EventEmitter<PixelMatrix> implements LayerElement {

  constructor(private data: PixelsData, private matrixWidth: number, private matrixHeight: number) {
    super();
  }

  getWidth() {
    return this.matrixWidth;
  }

  getHeight() {
    return this.matrixHeight;
  }

  getRawData() {
    return this.data;
  }

  setAt(x: number, y: number, pixel: Pixel) {
    this.isInBounds(x, y, true);
    for (let i = 0; i < 4; i++) {
      const pixelPartIndex = (y * this.getWidth()) + x;
      this.data[pixelPartIndex + (i * this.getWidth() * this.getHeight())] = pixel[i];
    }
    this.emit(PIXEL_MATRIX_UPDATED, this);
  }

  getAt(x: number, y: number) {
    this.isInBounds(x, y, true);
    const result = [];
    for (let i = 0; i < 4; i++) {
      const pixelPartIndex = (y * this.getWidth()) + x;
      result.push(this.data[pixelPartIndex + (i * this.getWidth() * this.getHeight())]);
    }
  }

  bulk(callback: (pixel: Pixel, x: number, y: number) => Pixel, update: boolean = false) {

    const fw = this.getWidth() * this.getHeight();
    const r = this.data.slice(fw * 0, fw * 1);
    const v = this.data.slice(fw * 1, fw * 2);
    const b = this.data.slice(fw * 2, fw * 3);
    const a = this.data.slice(fw * 3, fw * 4);

    for (let i = 0; i < fw; i++) {
      const x = i % this.getWidth();
      const y = (i - x) / this.getWidth();
      const pixel = callback([r[i], v[i], b[i], a[i]], x, y);

      if (update) {
        for (let i = 0; i < 4; i++) {
          const pixelPartIndex = (y * this.getWidth()) + x;
          this.data[pixelPartIndex + (i * this.getWidth() * this.getHeight())] = pixel[i];
        }
      }
    }

    if (update) {
      this.emit(PIXEL_MATRIX_UPDATED, this);
    }
  }

  clone(withSubscribers: boolean = false) {
    const dataClone = this.data.slice();
    const matrix = new PixelMatrix(dataClone, this.getWidth(), this.getHeight());
    if (withSubscribers) {
      this.copySubscribersOn(matrix);
    }
    return matrix;
  }

  isInBounds(x: number, y: number, throwException: boolean = false) {
    const inBound = x < this.getWidth() && y < this.getHeight();
    if (!inBound && throwException) {
      throw new Error(`Accessing pixel not in bounds: [${x},${y}] when matrix is [0-${this.getWidth()-1}, 0-${this.getHeight()-1}]`);
    }
    return inBound;
  }
}

export default PixelMatrix;