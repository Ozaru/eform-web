import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageFilterModel } from 'src/app/models/page-filter.model';
import { PageModel } from 'src/app/models/page.model';

@Injectable({
  providedIn: 'root',
})
export class ReciboTabelaStore {
  constructor(private http: HttpClient) {}

  obterTabela(
    filtroReciboTabela: FiltroReciboTabela
  ): Observable<PageModel<ReciboTabela>> {
    return this.http.get<PageModel<ReciboTabela>>(`/api/recibo-tabela`, {
      params: {
        id: filtroReciboTabela.id || "",
        usuarioId: filtroReciboTabela.usuarioId || "",
        fornecedorId: filtroReciboTabela.fornecedorId || "",
        dataInicial: filtroReciboTabela.dataInicial?.getMilliseconds() || "",
        dataFinal: filtroReciboTabela.dataFinal?.getMilliseconds() || "",
        valorInicial: filtroReciboTabela.valorInicial || "",
        valorFinal: filtroReciboTabela.valorFinal || "",
        status: filtroReciboTabela.status || "",
        page: filtroReciboTabela.pageNumber,
        size: filtroReciboTabela.pageSize
      },
    });
  }

  obterUsuariosFiltroReciboTabela(): Observable<UsuarioFiltroReciboTabela[]> {
    return this.http.get<UsuarioFiltroReciboTabela[]>("/api/recibo-tabela/usuarios-filtro")
  }

  obterFornecedoresFiltroReciboTabela(): Observable<FornecedorFiltroReciboTabela[]> {
    return this.http.get<FornecedorFiltroReciboTabela[]>("/api/recibo-tabela/fornecedores-filtro")
  }

  obterStatusFiltroReciboTabela(): Observable<StatusFiltroReciboTabela[]> {
    return this.http.get<StatusFiltroReciboTabela[]>("/api/recibo-tabela/status-filtro")
  }

}

export class FiltroReciboTabela extends PageFilterModel {
  id?: number;
  dataInicial?: Date;
  dataFinal?: Date;
  usuarioId?: number;
  fornecedorId?: number;
  valorInicial?: number;
  valorFinal?: number;
  status?: string;
}

export class ReciboTabela {
  id!: number;
  data!: Date;
  usuarioNome!: string;
  fornecedorNome!: string;
  valor!: number;
  status!: string;
}

export class UsuarioFiltroReciboTabela {
  id!: number
  nome!: string
}

export class FornecedorFiltroReciboTabela {
  id!: number
  nome!: string
}

export class StatusFiltroReciboTabela {
  nome!: string
  texto!: string
}
