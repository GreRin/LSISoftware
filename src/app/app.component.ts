import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  theme: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  changeTheme(themeColor: string) {
    this.theme = themeColor === 'dark' ? false : true;
  }
}
