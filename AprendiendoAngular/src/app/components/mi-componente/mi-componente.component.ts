import { Component } from "@angular/core";

@Component({
    selector: 'mi-componente',
    templateUrl: './mi-componente.component.html'
})

export class MiComponente {
    public titulo: string;
    public comentario: string;
    public mostrarPeliculas: boolean;

    constructor(){
        this.titulo = "Hola mundo, soy MI COMPONENTE";
        this.comentario = "Este es mi primer componente";
        this.mostrarPeliculas = true;
        console.log("Componente mi-componente");
    }

    ocultarPeliculas() {
        this.mostrarPeliculas = false;
    }
}