import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()
export class PeliculaService {

    public peliculas: Pelicula[];

    constructor() {
        this.peliculas = [
            new Pelicula("Spiderman 4", 2015, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJu1HweJrWcNfsFbbX_v6bSslQhcVunqSMiTgAtzhpFx4DTPaEst3XQUf3ioDgsUwwbVI&usqp=CAU"),
            new Pelicula("Los vengadores", 2018, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5NR3LEGTMehbVboo2xMYEM9L_VSkdHLwpRg&usqp=CAU")
        ]
    }

    holaMundo() {
        return 'Hola mundo desde un servicio de Angular!!!';
    }

    getPeliculas() {
        return this.peliculas
    }
}