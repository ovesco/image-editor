import EventEmitter from "./EventEmitter";
import LayerElement from "./LayerElement";

export const LAYER_ROTATED = 'rotated';
export const LAYER_DATA_CHANGED = 'data-changed';
export const LAYER_UPDATED = 'updated';
export const LAYER_MOVED = 'moved';

class Layer<T extends LayerElement> extends EventEmitter<Layer<T>> {

  private currentRotation: number;

  constructor(private data: T, private x: number = 0, private y: number = 0) {
    super();
  }

  get position(): [number, number] {
    return [this.x, this.y];
  }

  setPosition(position: [number, number]) {
    const [x, y] = position;
    this.x = x;
    this.y = y;
    this.chainEmit(LAYER_MOVED, position);
  }

  get rotation() {
    return this.currentRotation;
  }

  set rotation(rotation: number) {
    this.currentRotation = rotation;
    this.chainEmit(LAYER_ROTATED, rotation);
  }

  getData() {
    return this.data;
  }

  setData(newData: T) {
    this.data = newData;
    this.chainEmit(LAYER_DATA_CHANGED);
  }

  private chainEmit(baseEvent: string, ...args: any[]) {
    this.emit(baseEvent, this, ...args);
    this.emit(LAYER_UPDATED, this);
  }
}

export default Layer;