import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageFilterModel } from 'src/app/models/page-filter.model';
import { PageModel } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root',
})
export class ModeloTabelaStore {
  constructor(private http: HttpClient) {}

  obterTabela(
    filtroModeloTabela: FiltroModeloTabela
  ): Observable<PageModel<ModeloTabela>> {
    return this.http.get<PageModel<ModeloTabela>>(`/api/modelo-tabela`, {
      params: {
        nomeContem: filtroModeloTabela.nomeContem,
        inativo: filtroModeloTabela.inativo,
        page: filtroModeloTabela.pageNumber,
        size: filtroModeloTabela.pageSize,
      },
    });
  }
}

export class FiltroModeloTabela extends PageFilterModel {
  nomeContem!: string;
  inativo!: boolean;
}

export class ModeloTabela {
  id!: number;
  nome!: string;
  ativo!: boolean;
}
