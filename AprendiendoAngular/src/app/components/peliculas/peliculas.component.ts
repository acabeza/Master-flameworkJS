import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: string;

  constructor() { 
    this.titulo = "Pelicula";
    console.log("Constructor Lanzado");
  }

  ngOnInit(): void {
    console.log("Componente Lanzado");
  }

  ngDoCheck(): void {
    console.log("doCheck lanzado!!")
  }

  ngOnDestroy(): void {
    console.log("El componente se va a eliminar");
  }

  cambiarTitulo(){
    this.titulo = "El titulo ha sido cambiado";
  }

}
