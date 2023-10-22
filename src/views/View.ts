import { Callback, HasId } from "../types";
import { Model } from '../models/Model'

export abstract class View<T extends Model<K>, K extends HasId> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {}
  };

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    })
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(el => {
        el.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (const key in regionsMap) {
      const selector = regionsMap[key]
      const el = fragment.querySelector(selector);

      if (el) {
        this.regions[key] = el;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';

    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.template();

    this.bindEvents(templateEl.content);
    this.mapRegions(templateEl.content);

    this.onRender()

    this.parent.append(templateEl.content);
  }
}