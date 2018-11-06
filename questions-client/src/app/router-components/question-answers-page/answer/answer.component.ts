import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'src/app/model/answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input()
  answer: Answer;

  constructor() { }

  ngOnInit() {
  }

}
