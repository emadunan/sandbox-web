import axios, { AxiosPromise } from "axios";
import { ModelProps } from "../types";

export class ApiSync<T extends ModelProps> {
  constructor(public rootUrl: string) { }

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}