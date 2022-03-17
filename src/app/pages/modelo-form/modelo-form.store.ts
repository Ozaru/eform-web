import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModeloFormStore {
  constructor(private http: HttpClient) {}

  obterFormulario(id: number): Observable<ModeloForm> {
    return this.http.get<ModeloForm>(`/api/modelo-form/${id}`);
  }

  salvar(modeloForm: ModeloForm): Observable<number> {
    return this.http.post<number>(`/api/modelo-form`, modeloForm);
  }
}

export class ModeloForm {
  id!: number;
  nome!: string;
  ativo!: boolean;
}
