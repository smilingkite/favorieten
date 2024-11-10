import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Favoriet } from './favoriet';

@Injectable({
  providedIn: 'root',
})
export class FavorietService {
  constructor(private _httpClient: HttpClient) {}

  baseURl: String = '/api/v1/favorieten';

  // hier wil ik vermoedelijk iets mee om ook delete, plus & min vanaf widget te regelen.
  favorieten: WritableSignal<Favoriet[]> = signal([]);

  fetchAllFavorieten(): Observable<Favoriet[]> {
    return this._httpClient.get<Favoriet[]>(`${this.baseURl}`);
  }

  createFavoriet(data: Favoriet) {
    return this._httpClient.post<Favoriet>(`${this.baseURl}`, data);
  }

  updateFavoriet(data: Favoriet) {
    return this._httpClient.put<Favoriet>(
      `${this.baseURl}/${data.productId}`,
      data,
    );
  }

  deleteFavoriet(id: Number) {
    return this._httpClient.delete<Favoriet>(`${this.baseURl}/${id}`);
  }
}
