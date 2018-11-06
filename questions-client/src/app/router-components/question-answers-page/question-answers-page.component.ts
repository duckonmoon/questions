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
  questionId: number;
  private routeSub: any;
  private isActive: boolean;
  private isSubmissionFormActive: boolean;
  private isActiveSub: Subscription;
  private error: string;
  private success: boolean;

  constructor(private route: ActivatedRoute, private service: FullQuestionService, private auth: AuthGuard) { }

  ngOnInit() {
    this.isActive = this.auth.isActive();
    this.routeSub = this.route.params.subscribe((params) => {
      this.questionId = parseInt(params['questionId']);
      this.service.getFullQuestion(this.questionId)
        .subscribe((responce) => this.question = responce);
    });
    this.isActiveSub = this.auth.eventTosubscribe().subscribe((i) => this.isActive = i);
    this.isSubmissionFormActive = false;
  }

  writeStart() {
    this.isSubmissionFormActive = true;
  }

  submit(event) {
    if (event.title == null || event.description == null || event.title === "") {
      this.error = "Pls provide all information";
      return;
    }
    this.service.submitAnswer(event.title, event.description, this.questionId).subscribe(
      (i) => {
        this.error = undefined;
        this.success = true;
        this.service.getFullQuestion(this.questionId)
          .subscribe((responce) => {
            this.question = responce;
            this.success = undefined;
            this.isSubmissionFormActive = false;
          });
      }, (e) => {
        this.error = "Wrong data";
      }
    )
    console.log(event);
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.isActiveSub.unsubscribe();
  }

}
