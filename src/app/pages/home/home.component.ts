import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissao, VerificarPermissaoStore } from '../verificar-permissao.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menus: Menu[] = [
    {
      nome: 'Cadastro de itens',
      rota: 'item-tabela',
      claim: 'item_tabela-abrir',
    },
    {
      nome: 'Cadastro de modelos',
      rota: 'modelo-tabela',
      claim: 'modelo_tabela-abrir',
    },
    {
      nome: 'Cadastro de fornecedores',
      rota: 'fornecedor-tabela',
      claim: 'fornecedor_tabela-abrir',
    },
    {
      nome: 'Cadastro de recibos',
      rota: 'recibo-tabela',
      claim: 'recibo_tabela-abrir',
    },
    {
      nome: 'Meus recibos',
      rota: 'meu-recibo-tabela',
      claim: 'meu_recibo_tabela-abrir',
    },
  ];

  permissoes!: Permissao[]

  constructor(
    private router: Router,
    private verificarPermissaoStore: VerificarPermissaoStore
  ) {}

  ngOnInit(): void {
    this.verificaPermissoes()
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  private verificaPermissoes() {
    const claims = this.menus.map((menu) => menu.claim);
    this.verificarPermissaoStore.verificarPermissoes(claims).subscribe({
      next: (next) => {
        this.permissoes = next
      },
      error: (error) => {
        alert(JSON.stringify(error.error));
      },
    });
  }

  hasClaim(claim: string): boolean {
    const permissao = this.permissoes.find(permissao => permissao.nome == claim)
    return permissao?.existe || false
  }
}

class Menu {
  nome!: string
  rota!: string
  claim!: string
}
