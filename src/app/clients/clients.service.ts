import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clients } from './store/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Clients[]>('http://localhost:3000/clients');
  }

  create(payload: Clients) {
    return this.http.post<Clients>('http://localhost:3000/clients', payload);
  }

  update(payload: Clients) {
    return this.http.put<Clients>(
      `http://localhost:3000/clients/${payload.id}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/clients/${id}`);
  }
}
