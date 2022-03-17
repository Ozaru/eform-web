import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Permissao, VerificarPermissaoStore } from '../verificar-permissao.store';
import { ItemForm, ItemFormStore } from './item-form.store';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  private itemFormId!: number
  itemForm?: ItemForm
  claims = [
    "item_form-salvar"
  ]
  permissoes?: Permissao[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemFormStore: ItemFormStore,
    private router: Router,
    private verificarPermissaoStore: VerificarPermissaoStore
  ) { }

  ngOnInit(): void {
    this.loadParams().subscribe(next => this.obterFormulario())
    this.verificaPermissoes()
  }

  private loadParams() {
    return this.activatedRoute.paramMap.pipe(
      map(() => window.history.state),
      tap(next => this.itemFormId = next["itemFormId"])
    )
  }

  private obterFormulario() {
    if(!this.itemFormId) {
      this.itemForm = new ItemForm()
      return
    }
    this.itemFormStore.obterFormulario(this.itemFormId).subscribe({
      next: next => {
        this.itemForm = next
      },
      error: error => {
        alert(JSON.stringify(error.error))
      }
    })
  }

  cancelar() {
    this.router.navigate(["item-tabela"])
  }

  salvar() {
    if(!this.itemForm) {
      return
    }
    this.itemFormStore.salvar(this.itemForm).subscribe({
      next: next => {
        this.cancelar()
      },
      error: error => {
        alert(JSON.stringify(error.error))
      }
    })
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
