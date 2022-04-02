// class Model<T> {
//   collection: string;
//   host?: string;
//   constructor({ collection, host }: { collection: string; host?: string }) {
//     this.collection = collection;
//     this.host = host;
//   }

//   async find(): Promise<T> {
//     return this.model;
//   }
// }

// class Boat {
//   public name: string;
// }

// class BoatModel extends Model<Boat> {
//   constructor() {
//     super({
//       collection: "boats",
//       host: "https://madnesslabs.net",
//     });
//   }
// }

// const boats = new BoatModel();
// const speedboat = await boats.find();
