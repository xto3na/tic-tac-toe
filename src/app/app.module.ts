import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';


const appRoutes: Routes = [
  {
    path: '',
    component: GameComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    AboutComponent,
    NotFoundComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ToastModule.forRoot({
      animate: 'flyRight',
      positionClass: 'toast-top-center',
      toastLife: 3000,
      showCloseButton: false,
      maxShown: 5,
      newestOnTop: true,
      enableHTML: true,
      dismiss: 'auto',
      messageClass: "",
      titleClass: ""
    }),
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
