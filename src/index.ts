import { UserForm } from "./views/UserForm";
import { User } from "./models/User";

const rootEl = document.getElementById("root")!;
const user = User.build({ name: "NAME", age: 21 })

if (rootEl) {
  const userForm = new UserForm(rootEl, user);
  userForm.render();
} else {
  throw new Error("Root element is not found");
}
