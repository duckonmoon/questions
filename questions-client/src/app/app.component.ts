import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ThemeProvider } from './theme-service';
import { Theme } from './model/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'questions-client';

  private themes: Array<Theme> = [];
  private sub: any;
  private isNotThemeView = false;

  constructor(private themeProvider: ThemeProvider,
    private route: Router) {
      route.events.subscribe((r) => {
        if (typeof r['url'] === 'undefined') {
          return;
        }
        if (r['url'] !== '/themes' && r['url'] !== '/'  && r['url'] !== '/login'  && r['url'] !== '/register' ) {
          this.isNotThemeView = true;
        } else {
          this.isNotThemeView = false;
        }
      });
    }

  ngOnInit() {
    this.themeProvider.getJSON().subscribe(i => {
      this.themes = i;
    });
  }

  ngOnChanges() {
    console.log('here');
  }
}
