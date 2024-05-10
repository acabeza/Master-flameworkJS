import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from '../../models/pelicula'
import { PeliculaService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: string;
  public peliculas: Array<Pelicula>;
  public favorita?: Pelicula;
  public fecha: any;

  constructor(private _peliculaService: PeliculaService) { 
    this.titulo = "Pelicula";
    this.peliculas = this._peliculaService.getPeliculas();
    console.log("Constructor Lanzado");
    this.fecha = new Date(2020, 8, 12);
  }

  ngOnInit(): void {
    console.log("Componente Lanzado");
    console.log(this._peliculaService.holaMundo());
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

  mostrarFavorita(event: any) {
    this.favorita = event.pelicula
  }

}
