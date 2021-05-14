import EventEmitter from './model/EventEmitter';

export const CANVAS_CHANGE_SIZE = 'change-size';
export const CANVAS_CHANGE_ZOOM = 'change-zoom';
export const CANVAS_CHANGE_OFFSET = 'change-offset';
export const CANVAS_UPDATED = 'updated';

class CanvasDescriptor extends EventEmitter<CanvasDescriptor> {


  private width: number;

  private height: number;

  private zoomLevel: number = 0;

  private offsetX: number = 0;

  private offsetY: number = 0;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  getWidth() {
    return this.width;
  }

  setWidth(width: number) {
    this.width = width;
    this.chainEmit(CANVAS_CHANGE_SIZE);
  }

  getHeight() {
    return this.height;
  }

  setHeight(height: number) {
    this.height = height;
    this.chainEmit(CANVAS_CHANGE_SIZE);
  }

  setDimensions(dimensions: [number, number]) {
    const [width, height] = dimensions;
    this.height = height;
    this.width = width;
    this.chainEmit(CANVAS_CHANGE_SIZE);
  }

  getZoomLevel() {
    return this.zoomLevel;
  }

  setZoomLevel(level: number) {
    this.zoomLevel = level;
    this.chainEmit(CANVAS_CHANGE_ZOOM);
  }

  getOffsetX() {
    return this.offsetX;
  }

  setOffsetX(offsetX: number) {
    this.offsetX = offsetX;
    this.chainEmit(CANVAS_CHANGE_OFFSET);
  }

  getOffsetY() {
    return this.offsetY;
  }

  setOffsetY(offsetY: number) {
    this.offsetY = offsetY;
    this.chainEmit(CANVAS_CHANGE_OFFSET);
  }

  setOffset(offset: [number, number]) {
    const [x, y] = offset;
    this.offsetX = x;
    this.offsetY = y;
    this.chainEmit(CANVAS_CHANGE_OFFSET);
  }

  private chainEmit(sourceEvent: string) {
    this.emit(sourceEvent, this);
    this.emit(CANVAS_UPDATED, this);
  }
}

export default CanvasDescriptor;