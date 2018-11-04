import { Component, OnInit, Input } from '@angular/core';
import { Theme } from '../../model/theme';
import { ThemeProvider } from '../../theme-service';


@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {

  private themes: Array<Theme> = [];

  constructor(private themeProvider: ThemeProvider) { }

  ngOnInit() {
    this.themeProvider.getJSON().subscribe((i) => {
      this.themes = i;
    });
  }


}
