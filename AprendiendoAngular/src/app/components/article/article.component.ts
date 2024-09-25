import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  protected article: Article | any;
  protected url: string = "";
  constructor(
    protected _articleService: ArticleService,
    protected _route: ActivatedRoute,
    protected _router: Router
  ) {
    this.url = Global.url;
   }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        response => {
          if (response.article) {
            this.article = response.article
          } else {
            this._router.navigate(['/home']);
          }
        }, 
        error => {
          this._router.navigate(['/home']);
        }
      );
    })
  }

  delete(id: string) {
    Swal.fire({
      title: "Estas seguro?",
      text: "No seras capas de revertirlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if(result.isConfirmed) {
        this._articleService.delete(id).subscribe(
          response => {
            Swal.fire(
              'Exito!!',
              'Se pudo eliminar el articulo',
              'success'
            );
            this._router.navigate(['/blog']);
          }, err => {
            console.log(err);
            Swal.fire(
              'Error!!',
              'No se pudo eliminar el articulo',
              'error'
            );
            this._router.navigate(['/blog']);
          }
        )
      }
    });
  }

}
