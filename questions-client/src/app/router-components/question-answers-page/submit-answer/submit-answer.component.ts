import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submit-answer',
  templateUrl: './submit-answer.component.html',
  styleUrls: ['./submit-answer.component.css']
})
export class SubmitAnswerComponent implements OnInit {

  @Output()
  submitAnswer = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submit(){
    this.submitAnswer.emit({i : 10})
  }
}
