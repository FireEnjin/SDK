import localforage from "localforage";

export default class Queue {
  localKey: string;
  queue: any[] = [];
  history: { createdAt?: string; data?: any }[] = [];
  historyLimit = 0;

  constructor(options?: {
    localKey?: string;
    queue?: Promise<any>[];
    historyLimit?: number;
    history?: { createdAt?: string; data?: any }[];
  }) {
    this.localKey = options?.localKey || "fireenjin:queue";
    this.queue = options?.queue || [];
    this.historyLimit = options?.historyLimit || 0;
    this.history = options?.history || [];
    if (!this.history) {
      localforage?.getItem?.(`${this.localKey}:history`)?.then?.((data: any) => {
        console.log(data);
      });
    }
  }

  add(item: Promise<any>) {
    this.queue.push(item);

    return this;
  }

  async process() {
    const processed: any[] = [];
    for (const item of this.queue) {
      processed.push({
        createdAt: new Date().toISOString(),
        data: await item,
      });
    }
    this.history = [...this.history, ...processed];
    await localforage.setItem(`${this.localKey}:history`, this.history);

    return processed;
  }
}
