import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ItemTabelaComponent } from './pages/item-tabela/item-tabela.component';
import { FormsModule } from '@angular/forms';
import { ItemFormComponent } from './pages/item-form/item-form.component';
import { ModeloTabelaComponent } from './pages/modelo-tabela/modelo-tabela.component';
import { ModeloFormComponent } from './pages/modelo-form/modelo-form.component';
import { FornecedorTabelaComponent } from './pages/fornecedor-tabela/fornecedor-tabela.component';
import { FornecedorFormComponent } from './pages/fornecedor-form/fornecedor-form.component';
import { ReciboTabelaComponent } from './pages/recibo-tabela/recibo-tabela.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    ItemTabelaComponent,
    ItemFormComponent,
    ModeloTabelaComponent,
    ModeloFormComponent,
    FornecedorTabelaComponent,
    FornecedorFormComponent,
    ReciboTabelaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ["/api"],
          sendAccessToken: true
      }
  }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
