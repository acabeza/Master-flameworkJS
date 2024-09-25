import { Component, inject, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { ArticleComponent } from '../article/article.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent extends ArticleComponent implements OnInit {

  
  protected status: string = '';
  protected page_title: string;
  protected form_title: string;
  protected form_content: string;
  protected isEdit: boolean;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: 50,
    uploadAPI: {
      url: Global.url+'upload-image'
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      attachPinBtn: "Sube la imagen del articulo..."
    }
    
  };

  constructor(protected override _articleService: ArticleService,
    protected override _route: ActivatedRoute,
    protected override _router: Router
  ) {
    super(_articleService, _route, _router);
    this.article = new Article('', '', '', '', null);
    this.page_title = 'Nuevo Articulo';
    this.form_title = 'Añadir Titulo';
    this.form_content = 'Añadir Contenido';
    this.isEdit = false;
    this.url = Global.url;
  }

  override ngOnInit(): void {
  }

  onSubmit() {
    this._articleService.create(this.article).subscribe(
      response => {
        if (response.status === 'success') {
          this.status = 'success';
          this.article = response.article;

          //Alerta
          Swal.fire(
            'Articulo creado!!',
            'El articulo se ha creado correctamente',
            'success'
          );

          this._router.navigate(['/blog']);
        } else {
          this.status = 'error';
          Swal.fire(
            'Articulo no creado!!',
            'El articulo no se pudo crear con los datos añadidos',
            'error'
          );
        }
      },
      err => {
        console.log(err);
        this.status = 'error';
      }
    )
  }

  imageUpload(data: any) {
    let image_data = data.body;
    this.article.image = image_data.image;
  }

}
