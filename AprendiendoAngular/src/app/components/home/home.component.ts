import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title: string;
  public homeText = 'Bienvenido al Curso de Angular';
  constructor() {
    this.title = 'Últimos artículos';
   }

  ngOnInit(): void {
  }

}
