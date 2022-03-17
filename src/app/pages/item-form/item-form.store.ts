import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemFormStore {
  constructor(private http: HttpClient) {}

  obterFormulario(id: number): Observable<ItemForm> {
    return this.http.get<ItemForm>(`/api/item-form/${id}`);
  }

  salvar(itemForm: ItemForm): Observable<number> {
    return this.http.post<number>(`/api/item-form`, itemForm);
  }
}

export class ItemForm {
  id!: number;
  nome!: string;
  ativo!: boolean;
}
