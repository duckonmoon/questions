import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemesComponent } from './router-components/themes/themes.component';
import { QuestionsContainerComponent } from './router-components/questions-container/questions-container.component';
import { LoginComponent } from './router-components/login/login.component';
import { RegisterComponent } from './router-components/register/register.component';
import { LoginGuard } from './__guards/login.guards';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AskQuestionFormComponent } from './router-components/ask-question-form/ask-question-form.component';
import { AuthGuard } from './__guards/auth.guards';
import { QuestionAnswersPageComponent } from './router-components/question-answers-page/question-answers-page.component';

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
    path: 'theme/:themeId/question/:questionId',
    component: QuestionAnswersPageComponent
  },
  {
    path: 'themes',
    component: ThemesComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'theme/:themeId/submitquestion',
    component: AskQuestionFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
