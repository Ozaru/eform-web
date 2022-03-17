import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageModel } from 'src/app/models/page.model';
import { Permissao, VerificarPermissaoStore } from '../verificar-permissao.store';
import { FiltroModeloTabela, ModeloTabela, ModeloTabelaStore } from './modelo-tabela.store';

@Component({
  selector: 'app-modelo-tabela',
  templateUrl: './modelo-tabela.component.html',
  styleUrls: ['./modelo-tabela.component.scss']
})
export class ModeloTabelaComponent implements OnInit {

  filtroModeloTabela = new FiltroModeloTabela()
  modelosTabela?: PageModel<ModeloTabela>
  claims = [
    "modelo_form-abrir",
    "modelo_form-salvar"
  ]
  permissoes?: Permissao[]

  constructor(
    private modeloTabelaStore: ModeloTabelaStore,
    private router: Router,
    private verificarPermissaoStore: VerificarPermissaoStore
  ) { }

  async ngOnInit() {
    this.verificaPermissoes()
    this.initFiltro()
    this.atualizar()
  }

  private initFiltro() {
    this.filtroModeloTabela.nomeContem = "";
    this.filtroModeloTabela.inativo = false
  }

  atualizar() {
    this.modelosTabela = undefined
    this.modeloTabelaStore.obterTabela(this.filtroModeloTabela).subscribe({
      next: next => {
        this.modelosTabela = next
      },
      error: error => {
        alert(JSON.stringify(error.error))
      }
    })
  }

  mudarPagina(numeroDaPagina: number) {
    this.filtroModeloTabela.pageNumber = numeroDaPagina
    this.atualizar()
  }

  abrirRegistro(modeloTabelaId: number) {
    if(this.hasClaim("modelo_form-abrir")) {
      this.router.navigate(["modelo-form"], { state: { itemFormId: modeloTabelaId } })
    } else {
      alert("Você nao tem permissão para abrir os registros");
    }
  }

  inserir() {
    this.router.navigate(["modelo-form"])
  }

  private verificaPermissoes() {
    this.permissoes = undefined
    this.verificarPermissaoStore.verificarPermissoes(this.claims).subscribe({
      next: (next) => {
        this.permissoes = next
      },
      error: (error) => {
        alert(JSON.stringify(error.error));
      },
    });
  }

  hasClaim(claim: string): boolean {
    const permissao = this.permissoes?.find(permissao => permissao.nome == claim)
    return permissao?.existe || false
  }

}
