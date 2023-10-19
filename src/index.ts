import { User } from "./models/User";

// const user = new User({ name: "new record", age: 0 });

// console.log(user.get('name'));

// TEST This

class Emp {
  arr = ["a", "b", "c"];

  constructor(public name: string) { }

  normalFn() {
    console.log(this);
  }

  arrowFn = () => {
    console.log(this);
  }
}

const emp = new Emp("emad");

const e1 = emp.normalFn;
const e2 = emp.arrowFn;

e1();
e2();