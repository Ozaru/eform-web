import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageFilterModel } from 'src/app/models/page-filter.model';
import { PageModel } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root',
})
export class ItemTabelaStore {
  constructor(private http: HttpClient) {}

  obterTabela(
    filtroItemTabela: FiltroItemTabela
  ): Observable<PageModel<ItemTabela>> {
    return this.http.get<PageModel<ItemTabela>>(`/api/item-tabela`, {
      params: {
        nomeContem: filtroItemTabela.nomeContem,
        inativo: filtroItemTabela.inativo,
        page: filtroItemTabela.pageNumber,
        size: filtroItemTabela.pageSize,
      },
    });
  }
}

export class FiltroItemTabela extends PageFilterModel {
  nomeContem!: string;
  inativo!: boolean;
}

export class ItemTabela {
  id!: number;
  nome!: string;
  ativo!: boolean;
}
