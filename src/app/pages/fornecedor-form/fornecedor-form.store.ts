import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FornecedorFormStore {
  constructor(private http: HttpClient) {}

  obterFormulario(id: number): Observable<FornecedorForm> {
    return this.http.get<FornecedorForm>(`/api/fornecedor-form/${id}`);
  }

  salvar(fornecedorForm: FornecedorForm): Observable<number> {
    return this.http.post<number>(`/api/fornecedor-form`, fornecedorForm);
  }
}

export class FornecedorForm {
  id!: number;
  nome!: string;
  ativo!: boolean;
}
