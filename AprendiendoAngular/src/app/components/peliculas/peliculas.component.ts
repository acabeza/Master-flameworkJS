import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from '../../models/pelicula'

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: string;
  public peliculas: Array<Pelicula>;
  public favorita?: Pelicula;
  public fecha: any;

  constructor() { 
    this.titulo = "Pelicula";
    this.peliculas = [new Pelicula("Spiderman 4", 2015, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJu1HweJrWcNfsFbbX_v6bSslQhcVunqSMiTgAtzhpFx4DTPaEst3XQUf3ioDgsUwwbVI&usqp=CAU"),
  new Pelicula("Los vengadores", 2018, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5NR3LEGTMehbVboo2xMYEM9L_VSkdHLwpRg&usqp=CAU")]
    console.log("Constructor Lanzado");
    this.fecha = new Date(2020, 8, 12);
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

  mostrarFavorita(event: any) {
    this.favorita = event.pelicula
  }

}
