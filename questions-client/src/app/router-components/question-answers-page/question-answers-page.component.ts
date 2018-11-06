import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullQuestionService } from './question.answer.service';
import { ActivatedRoute } from '@angular/router';
import { FullQuestion } from 'src/app/model/fullquestion';
import { AuthGuard } from 'src/app/__guards/auth.guards';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-answers-page',
  templateUrl: './question-answers-page.component.html',
  styleUrls: ['./question-answers-page.component.css']
})
export class QuestionAnswersPageComponent implements OnInit, OnDestroy {

  question: FullQuestion;
  private routeSub: any;
  private isActive: boolean;
  private isSubmissionFormActive: boolean;
  private isActiveSub: Subscription;

  constructor(private route: ActivatedRoute, private service: FullQuestionService, private auth: AuthGuard) { }

  ngOnInit() {
    this.isActive = this.auth.isActive();
    this.routeSub = this.route.params.subscribe((params) => {
      this.service.getFullQuestion(parseInt(params['questionId']))
      .subscribe((responce) => this.question = responce);
    });
    this.isActiveSub = this.auth.eventTosubscribe().subscribe((i) => this.isActive = i);
    this.isSubmissionFormActive = false;
  }

  writeStart(){
    this.isSubmissionFormActive = true;
  }

  submit(event){
    console.log(event);
  }
  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.isActiveSub.unsubscribe();
  }

}
