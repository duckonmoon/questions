import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeProvider } from 'src/app/theme-service';
import { Theme } from 'src/app/model/theme';
import { ActivatedRoute } from '@angular/router';
import { AskQuestionService } from './ask-question-service';
import { AuthGuard } from 'src/app/__guards/auth.guards';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ask-question-form',
  templateUrl: './ask-question-form.component.html',
  styleUrls: ['./ask-question-form.component.css']
})
export class AskQuestionFormComponent implements OnInit, OnDestroy {

  themes: Array<Theme>;
  theme: Theme;
  themeId: number;
  private routeSub: any;

  success: boolean;
  fail: boolean;

  title: string;
  description: string;
  private isActiveSub: Subscription;

  constructor(private provider: ThemeProvider,
    private route: ActivatedRoute,
    private service: AskQuestionService,
    private auth: AuthGuard
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.themeId = parseInt(params['themeId']);
    });
    this.provider.getJSON().subscribe((i) => {
      this.themes = i;
      this.theme = this.themes.find((i) => i.id === this.themeId)
    });
    this.isActiveSub = this.auth.eventTosubscribe().subscribe((i) => window.location.reload());
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.isActiveSub.unsubscribe();
  }

  submit() {
    this.service.postQuestion(this.title, this.description, this.themeId).subscribe((i) => {
      this.success = true;
      this.fail = false;
    }, (e) => {
      console.log = e;
      this.success = false;
      this.fail = true;
    })
  }

}
