import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageModel } from 'src/app/models/page.model';
import { Permissao, VerificarPermissaoStore } from '../verificar-permissao.store';
import { FiltroItemTabela as FiltroItemTabela, ItemTabela as ItemTabela, ItemTabelaStore as ItemTabelaStore } from './item-tabela.store';

@Component({
  selector: 'app-item',
  templateUrl: './item-tabela.component.html',
  styleUrls: ['./item-tabela.component.scss']
})
export class ItemTabelaComponent implements OnInit {

  filtroItemTabela = new FiltroItemTabela()
  itensTabela?: PageModel<ItemTabela>
  claims = [
    "item_form-abrir",
    "item_form-salvar"
  ]
  permissoes?: Permissao[]

  constructor(
    private itemTabelaStore: ItemTabelaStore,
    private router: Router,
    private verificarPermissaoStore: VerificarPermissaoStore
  ) { }

  async ngOnInit() {
    this.verificaPermissoes()
    this.initFiltro()
    this.atualizar()
  }

  private initFiltro() {
    this.filtroItemTabela.nomeContem = "";
    this.filtroItemTabela.inativo = false
  }

  atualizar() {
    this.itensTabela = undefined
    this.itemTabelaStore.obterTabela(this.filtroItemTabela).subscribe({
      next: next => {
        this.itensTabela = next
      },
      error: error => {
        alert(JSON.stringify(error.error))
      }
    })
  }

  mudarPagina(numeroDaPagina: number) {
    this.filtroItemTabela.pageNumber = numeroDaPagina
    this.atualizar()
  }

  abrirRegistro(itemTabelaId: number) {
    if(this.hasClaim("item_form-abrir")) {
      this.router.navigate(["item-form"], { state: { itemFormId: itemTabelaId } })
    } else {
      alert("Você nao tem permissão para abrir os registros");
    }
  }

  inserir() {
    this.router.navigate(["item-form"])
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
