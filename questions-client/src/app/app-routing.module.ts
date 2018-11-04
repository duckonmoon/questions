import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemesComponent } from './router-components/themes/themes.component';
import { QuestionsContainerComponent } from './router-components/questions-container/questions-container.component';
import { LoginComponent } from './router-components/login/login.component';
import { RegisterComponent } from './router-components/register/register.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/themes',
    pathMatch: 'full'
  },
  {
    path: 'theme/:themeId',
    component: QuestionsContainerComponent
  },
  {
    path: 'themes',
    component: ThemesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
