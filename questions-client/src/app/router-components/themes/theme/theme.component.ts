import { Component, OnInit, Input } from '@angular/core';
import { Theme } from '../../../model/theme';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  @Input() theme: Theme;

  constructor() {
  }

  ngOnInit() {
  }

}
