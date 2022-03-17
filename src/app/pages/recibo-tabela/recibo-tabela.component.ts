import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageModel } from 'src/app/models/page.model';
import {
  Permissao,
  VerificarPermissaoStore
} from '../verificar-permissao.store';
import {
  FiltroReciboTabela,
  FornecedorFiltroReciboTabela,
  ReciboTabela,
  ReciboTabelaStore,
  StatusFiltroReciboTabela,
  UsuarioFiltroReciboTabela
} from './recibo-tabela.store';

@Component({
  selector: 'app-recibo-tabela',
  templateUrl: './recibo-tabela.component.html',
  styleUrls: ['./recibo-tabela.component.scss'],
})
export class ReciboTabelaComponent implements OnInit {
  filtroReciboTabela = new FiltroReciboTabela();
  recibosTabela?: PageModel<ReciboTabela>;
  usuariosFiltroReciboTabela?: UsuarioFiltroReciboTabela[];
  fornecedoresFiltroReciboTabela?: FornecedorFiltroReciboTabela[];
  statusFiltroReciboTabela?: StatusFiltroReciboTabela[]
  claims = ['recibo_form-abrir'];
  permissoes?: Permissao[];

  constructor(
    private reciboTabelaStore: ReciboTabelaStore,
    private router: Router,
    private verificarPermissaoStore: VerificarPermissaoStore
  ) {}

  async ngOnInit() {
    this.verificaPermissoes();
    this.initFiltro();
    this.obterUsuariosFiltroReciboTabela()
    this.obterFornecedoresFiltroReciboTabela()
    this.obterStatusFiltroReciboTabela()
    this.atualizar();
  }

  private initFiltro() {}

  atualizar() {
    this.recibosTabela = undefined;
    this.reciboTabelaStore.obterTabela(this.filtroReciboTabela).subscribe({
      next: (next) => {
        this.recibosTabela = next;
      },
      error: (error) => {
        alert(JSON.stringify(error.error));
      },
    });
  }

  private obterUsuariosFiltroReciboTabela() {
    this.usuariosFiltroReciboTabela = undefined;
    this.reciboTabelaStore.obterUsuariosFiltroReciboTabela().subscribe({
      next: (next) => {
        this.usuariosFiltroReciboTabela = next;
      },
      error: (error) => {
        alert(JSON.stringify(error.error));
      },
    });
  }

  private obterFornecedoresFiltroReciboTabela() {
    this.fornecedoresFiltroReciboTabela = undefined;
    this.reciboTabelaStore.obterFornecedoresFiltroReciboTabela().subscribe({
      next: (next) => {
        this.fornecedoresFiltroReciboTabela = next;
      },
      error: (error) => {
        alert(JSON.stringify(error.error));
      },
    });
  }

  private obterStatusFiltroReciboTabela() {
    this.statusFiltroReciboTabela = undefined;
    this.reciboTabelaStore.obterStatusFiltroReciboTabela().subscribe({
      next: (next) => {
        this.statusFiltroReciboTabela = next;
      },
      error: (error) => {
        alert(JSON.stringify(error.error));
      },
    });
  }

  mudarPagina(numeroDaPagina: number) {
    this.filtroReciboTabela.pageNumber = numeroDaPagina;
    this.atualizar();
  }

  abrirRegistro(reciboTabelaId: number) {
    if (this.hasClaim('recibo_form-abrir')) {
      this.router.navigate(['recibo-form'], {
        state: { reciboFormId: reciboTabelaId },
      });
    } else {
      alert('Você nao tem permissão para abrir os registros');
    }
  }

  private verificaPermissoes() {
    this.permissoes = undefined;
    this.verificarPermissaoStore.verificarPermissoes(this.claims).subscribe({
      next: (next) => {
        this.permissoes = next;
      },
      error: (error) => {
        alert(JSON.stringify(error.error));
      },
    });
  }

  hasClaim(claim: string): boolean {
    const permissao = this.permissoes?.find(
      (permissao) => permissao.nome == claim
    );
    return permissao?.existe || false;
  }
}
