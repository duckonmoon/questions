import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Question } from '../../model/question'
import { QuestionsProvider } from './questions-provider';
import { Subscription } from 'rxjs';
import { Theme } from 'src/app/model/theme';
import { AuthGuard } from 'src/app/__guards/auth.guards';

@Component({
  selector: 'app-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.css']
})
export class QuestionsContainerComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute,private provider: QuestionsProvider,private auth: AuthGuard) {
  }

  private themeId: number;
  private theme: Theme;
  private routeSub: any;
  private questions: Array<Question> 

  isActiveSub: Subscription;
  isActive: boolean;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.themeId = params['themeId'];
      this.provider.getJSON(this.themeId).subscribe((responce) => {
        this.questions = responce.questions;
        this.theme = responce.theme;
      })
    });

    this.isActiveSub = this.auth.eventTosubscribe().subscribe((next) => {
      this.isActive = next;
    })
    this.isActive = this.auth.isActive();
    
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.isActiveSub.unsubscribe();
  }
}
