import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { FornecedorFormComponent } from './pages/fornecedor-form/fornecedor-form.component';
import { FornecedorTabelaComponent } from './pages/fornecedor-tabela/fornecedor-tabela.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemFormComponent } from './pages/item-form/item-form.component';
import { ItemTabelaComponent } from './pages/item-tabela/item-tabela.component';
import { LoginComponent } from './pages/login/login.component';
import { ModeloFormComponent } from './pages/modelo-form/modelo-form.component';
import { ModeloTabelaComponent } from './pages/modelo-tabela/modelo-tabela.component';
import { ReciboTabelaComponent } from './pages/recibo-tabela/recibo-tabela.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "home",
        component: HomeComponent,
        data: {
          breadcrumb: 'Home'
        }
      },
      {
        path: "item-tabela",
        component: ItemTabelaComponent,
        data: {
          breadcrumb: 'Cadastro de itens'
        }
      },
      {
        path: "item-form",
        component: ItemFormComponent,
        data: {
          breadcrumb: 'Edição de item'
        }
      },
      {
        path: "modelo-tabela",
        component: ModeloTabelaComponent,
        data: {
          breadcrumb: 'Cadastro de modelos'
        }
      },
      {
        path: "modelo-form",
        component: ModeloFormComponent,
        data: {
          breadcrumb: 'Edição de modelos'
        }
      },
      {
        path: "fornecedor-tabela",
        component: FornecedorTabelaComponent,
        data: {
          breadcrumb: 'Cadastro de fornecedores'
        }
      },
      {
        path: "fornecedor-form",
        component: FornecedorFormComponent,
        data: {
          breadcrumb: 'Edição de fornecedores'
        }
      },
      {
        path: "recibo-tabela",
        component: ReciboTabelaComponent,
        data: {
          breadcrumb: 'Cadastro de recibos'
        }
      },
    ]
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
