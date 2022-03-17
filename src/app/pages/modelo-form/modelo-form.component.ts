import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Permissao, VerificarPermissaoStore } from '../verificar-permissao.store';
import { ModeloForm, ModeloFormStore } from './modelo-form.store';

@Component({
  selector: 'app-modelo-form',
  templateUrl: './modelo-form.component.html',
  styleUrls: ['./modelo-form.component.scss']
})
export class ModeloFormComponent implements OnInit {

  private modeloFormId!: number
  modeloForm?: ModeloForm
  claims = [
    "modelo_form-salvar"
  ]
  permissoes?: Permissao[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private modeloFormStore: ModeloFormStore,
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
      tap(next => this.modeloFormId = next["modeloFormId"])
    )
  }

  private obterFormulario() {
    if(!this.modeloFormId) {
      this.modeloForm = new ModeloForm()
      return
    }
    this.modeloFormStore.obterFormulario(this.modeloFormId).subscribe({
      next: next => {
        this.modeloForm = next
      },
      error: error => {
        alert(JSON.stringify(error.error))
      }
    })
  }

  cancelar() {
    this.router.navigate(["modelo-tabela"])
  }

  salvar() {
    if(!this.modeloForm) {
      return
    }
    this.modeloFormStore.salvar(this.modeloForm).subscribe({
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
