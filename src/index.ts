import { UserEdit } from "./views/UserEdit";
import { User, UserProps } from "./models/User";

import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";

const rootEl = document.getElementById("root")!;
const user = User.build({ name: "NAME", age: 21 });

const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.build(json)
  }
);

users.fetch();

users.on("change", () => {
  if (rootEl) {
    new UserList(rootEl, users).render();
  }
})

if (rootEl) {
  const userEdit = new UserEdit(rootEl, user);
  userEdit.render();

  console.log(userEdit);
  
} else {
  throw new Error("Root element is not found");
}
