export class Attributes<T extends object> {
  constructor(private data: T) { }

  get = <K extends keyof T>(key: K): T[K] => {
    console.log("This", this);
    
    return this.data[key];
  }

  set(update: T): void {
    Object.assign(this.data, update);
  }
}
