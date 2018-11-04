import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../__guards/auth.guards';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isActiveSub: Subscriber<Boolean>;
  isActive: boolean;

  constructor(private auth: AuthGuard) { 
  }

  ngOnInit() {
    this.auth.eventTosubscribe().subscribe((next) => {
      this.isActive = next;
    })
  }

}
