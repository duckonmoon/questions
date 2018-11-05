import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeProvider } from 'src/app/theme-service';
import { Theme } from 'src/app/model/theme';
import { ActivatedRoute } from '@angular/router';
import { AskQuestionService } from './ask-question-service';

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

  constructor(private provider: ThemeProvider, private route: ActivatedRoute, private service: AskQuestionService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.themeId = parseInt(params['themeId']);
    });
    this.provider.getJSON().subscribe((i) => {
      this.themes = i;
      this.theme = this.themes.find((i) => i.id === this.themeId)
    })

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  submit() {
    this.service.postQuestion(this.title,this.description,this.themeId).subscribe((i)=> {
      console.log(i);
      this.success = true;
      this.fail = false;
    }, (e) => {
      console.log = e;
      this.success = false;
      this.fail = true;
    })
  }

}
