import localforage from "localforage";
export default class Queue {
    localKey;
    queue = [];
    history = [];
    historyLimit = 0;
    constructor(options) {
        this.localKey = options?.localKey || "fireenjin:queue";
        this.queue = options?.queue || [];
        this.historyLimit = options?.historyLimit || 0;
        this.history = options?.history || [];
        if (!this.history) {
            localforage?.getItem?.(`${this.localKey}:history`)?.then?.((data) => {
                console.log(data);
            });
        }
    }
    add(item) {
        this.queue.push(item);
        return this;
    }
    async process() {
        const processed = [];
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
