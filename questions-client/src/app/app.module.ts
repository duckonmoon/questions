import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ThemesComponent } from './router-components/themes/themes.component';
import { ThemeComponent } from './router-components/themes/theme/theme.component';
import { ThemeProvider } from './theme-service';
import {QuestionsProvider} from './router-components/questions-container/questions-provider';
import { QuestionsContainerComponent } from './router-components/questions-container/questions-container.component';
import { QuestionContainerComponent } from './router-components/questions-container/question-container/question-container.component';
import { AuthGuard } from './__guards/auth.guards';
import { LoginComponent } from './router-components/login/login.component';
import { RegisterComponent } from './router-components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './router-components/register/registration.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ThemesComponent,
    ThemeComponent,
    QuestionsContainerComponent,
    QuestionContainerComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ThemeProvider,
    QuestionsProvider,
    AuthGuard,
    RegistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
