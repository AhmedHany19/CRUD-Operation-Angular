import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private service: HttpClient) {}
  url: string = 'http://localhost:3000/posts/';

  postEmployee(data: any) {
    return this.service.post(this.url, data);
  }
  getEmployee() {
    return this.service.get(this.url);
  }

  deleteEmployee(id: any) {
    return this.service.delete(this.url + id);
  }
  updateEmployee(data: any, id: number) {
    return this.service.put(this.url + id, data);
  }
}
