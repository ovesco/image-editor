import EventEmitter from './model/EventEmitter';
import Layer from './model/Layer';
import LayerElement from './model/LayerElement';

export const LAYER_STACK_UPDATED = 'updated';

type ManagedLayer = Layer<LayerElement>;

class LayerStack extends EventEmitter<LayerStack> {

  private layers: ManagedLayer[];

  addLayer(layer: ManagedLayer, order?: number) {
    order = !order || order > this.layers.length ? this.layers.length : order;
    this.layers.splice(order, 0, layer);
    this.emit(LAYER_STACK_UPDATED, this);
  }

  indexOf(layer: ManagedLayer) {
    return this.layers.indexOf(layer);
  }
}

export default LayerStack;