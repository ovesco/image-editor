import CanvasDescriptor, { CANVAS_UPDATED } from "./CanvasDescriptor";
import LayerStack, { LAYER_STACK_UPDATED } from "./LayerStack";

class Picasso {

  private stack: LayerStack;

  private context: CanvasRenderingContext2D;

  private descriptor: CanvasDescriptor;

  constructor(canvas: HTMLCanvasElement) {
    this.descriptor = new CanvasDescriptor(canvas.width, canvas.height);
    this.stack = new LayerStack();
    this.context = canvas.getContext('2d');

    this.stack.on(LAYER_STACK_UPDATED, this.redraw);
    this.descriptor.on(CANVAS_UPDATED, this.redraw);
  }

  getStack() {
    return this.stack;
  }

  getCanvasDescriptor() {
    return this.descriptor;
  }

  private redraw() {
    
  }
}