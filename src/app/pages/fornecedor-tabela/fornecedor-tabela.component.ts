import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageModel } from 'src/app/models/page.model';
import {
  Permissao,
  VerificarPermissaoStore,
} from '../verificar-permissao.store';
import {
  FiltroFornecedorTabela,
  FornecedorTabela,
  FornecedorTabelaStore,
} from './fornecedor-tabela.store';

@Component({
  selector: 'app-fornecedor-tabela',
  templateUrl: './fornecedor-tabela.component.html',
  styleUrls: ['./fornecedor-tabela.component.scss'],
})
export class FornecedorTabelaComponent implements OnInit {
  filtroFornecedorTabela = new FiltroFornecedorTabela();
  fornecedoresTabela?: PageModel<FornecedorTabela>;
  claims = ['fornecedor_form-abrir', 'fornecedor_form-salvar'];
  permissoes?: Permissao[];

  constructor(
    private fornecedorTabelaStore: FornecedorTabelaStore,
    private router: Router,
    private verificarPermissaoStore: VerificarPermissaoStore
  ) {}

  async ngOnInit() {
    this.verificaPermissoes();
    this.initFiltro();
    this.atualizar();
  }

  private initFiltro() {
    this.filtroFornecedorTabela.nomeContem = '';
    this.filtroFornecedorTabela.inativo = false;
  }

  atualizar() {
    this.fornecedoresTabela = undefined;
    this.fornecedorTabelaStore
      .obterTabela(this.filtroFornecedorTabela)
      .subscribe({
        next: (next) => {
          this.fornecedoresTabela = next;
        },
        error: (error) => {
          alert(JSON.stringify(error.error));
        },
      });
  }

  mudarPagina(numeroDaPagina: number) {
    this.filtroFornecedorTabela.pageNumber = numeroDaPagina;
    this.atualizar();
  }

  abrirRegistro(fornecedorTabelaId: number) {
    if (this.hasClaim('fornecedor_form-abrir')) {
      this.router.navigate(['fornecedor-form'], {
        state: { fornecedorFormId: fornecedorTabelaId },
      });
    } else {
      alert('Você nao tem permissão para abrir os registros');
    }
  }

  inserir() {
    this.router.navigate(['fornecedor-form']);
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
