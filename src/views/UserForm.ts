import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");

    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  }

  onSaveClick = (): void => {
    console.log(this.model);
    
    this.model.save();
  }

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}"/>
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save User</button>
      </div>
    `;
  };

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(el => {
        el.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  render(): void {
    this.parent.innerHTML = '';

    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.template();

    this.bindEvents(templateEl.content);

    this.parent.append(templateEl.content);
  }
}