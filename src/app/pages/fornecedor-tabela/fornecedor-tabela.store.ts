import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageFilterModel } from 'src/app/models/page-filter.model';
import { PageModel } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root',
})
export class FornecedorTabelaStore {
  constructor(private http: HttpClient) {}

  obterTabela(
    filtroFornecedorTabela: FiltroFornecedorTabela
  ): Observable<PageModel<FornecedorTabela>> {
    return this.http.get<PageModel<FornecedorTabela>>(`/api/fornecedor-tabela`, {
      params: {
        nomeContem: filtroFornecedorTabela.nomeContem,
        inativo: filtroFornecedorTabela.inativo,
        page: filtroFornecedorTabela.pageNumber,
        size: filtroFornecedorTabela.pageSize,
      },
    });
  }
}

export class FiltroFornecedorTabela extends PageFilterModel {
  nomeContem!: string;
  inativo!: boolean;
}

export class FornecedorTabela {
  id!: number;
  nome!: string;
  ativo!: boolean;
}
