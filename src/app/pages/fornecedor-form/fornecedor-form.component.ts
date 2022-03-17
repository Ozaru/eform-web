import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import {
  Permissao,
  VerificarPermissaoStore
} from '../verificar-permissao.store';
import { FornecedorForm, FornecedorFormStore } from './fornecedor-form.store';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss'],
})
export class FornecedorFormComponent implements OnInit {
  private fornecedorFormId!: number;
  fornecedorForm?: FornecedorForm;
  claims = ['fornecedor_form-salvar'];
  permissoes?: Permissao[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fornecedorFormStore: FornecedorFormStore,
    private router: Router,
    private verificarPermissaoStore: VerificarPermissaoStore
  ) {}

  ngOnInit(): void {
    this.loadParams().subscribe((next) => this.obterFormulario());
    this.verificaPermissoes();
  }

  private loadParams() {
    return this.activatedRoute.paramMap.pipe(
      map(() => window.history.state),
      tap((next) => (this.fornecedorFormId = next['fornecedorFormId']))
    );
  }

  private obterFormulario() {
    if (!this.fornecedorFormId) {
      this.fornecedorForm = new FornecedorForm();
      return;
    }
    this.fornecedorFormStore.obterFormulario(this.fornecedorFormId).subscribe({
      next: (next) => {
        this.fornecedorForm = next;
      },
      error: (error) => {
        alert(JSON.stringify(error.error));
      },
    });
  }

  cancelar() {
    this.router.navigate(['fornecedor-tabela']);
  }

  salvar() {
    if (!this.fornecedorForm) {
      return;
    }
    this.fornecedorFormStore.salvar(this.fornecedorForm).subscribe({
      next: (next) => {
        this.cancelar();
      },
      error: (error) => {
        alert(JSON.stringify(error.error));
      },
    });
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
