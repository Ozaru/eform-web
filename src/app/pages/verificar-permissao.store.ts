import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class VerificarPermissaoStore {
  constructor(private http: HttpClient) {}

  verificarPermissoes(permissoes: string[]): Observable<Permissao[]> {
    return this.http.post<Permissao[]>(`/api/verificar-permissoes`, permissoes);
  }

}

export class Permissao {
  nome!: string
  existe!: boolean
}
