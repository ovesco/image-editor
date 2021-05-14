class InMemoryCanvasPool {

  private canvas: HTMLCanvasElement[];

  private static instance: InMemoryCanvasPool | null = null;

  public static getCanvas(width: number, height: number) {
    if (!InMemoryCanvasPool.instance) {
      InMemoryCanvasPool.instance = new InMemoryCanvasPool();
    }
  }
}

export default InMemoryCanvasPool.getCanvas;