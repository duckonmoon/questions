import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/model/question';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.css']
})
export class QuestionContainerComponent implements OnInit {

  @Input()
  question : Question

  constructor() { }

  ngOnInit() {
  }

}
