import CanvasDescriptor from "../CanvasDescriptor";
import Layer from "../model/Layer";

export type Painter<T> = (layer: Layer<T>, canvasContext: CanvasDescriptor) => any;