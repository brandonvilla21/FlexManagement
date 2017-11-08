import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-content',
  templateUrl: './help-content.component.html',
  styleUrls: ['./help-content.component.scss']
})
export class HelpContentComponent implements    OnInit {
  public productos1 = 'http://localhost:3000/assets/productos1.png';
  public productos2 = 'http://localhost:3000/assets/productos2.png';
  public productos3 = 'http://localhost:3000/assets/productos3.png';
  constructor() {
  }

  ngOnInit() {
  }


}
