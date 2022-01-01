export default class Queue {
    localKey: string;
    queue: any[];
    history: {
        createdAt?: string;
        data?: any;
    }[];
    historyLimit: number;
    constructor(options?: {
        localKey?: string;
        queue?: Promise<any>[];
        historyLimit?: number;
        history?: any[];
    });
    add(item: Promise<any>): this;
    process(): Promise<any[]>;
}
