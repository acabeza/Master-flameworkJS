import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { ArticleNewComponent } from '../article-new/article-new.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent extends ArticleNewComponent implements OnInit {

  override afuConfig = {
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

  constructor(_articleService: ArticleService,
     _route: ActivatedRoute,
     _router: Router) {
    super(_articleService, _route, _router);
    this.page_title = 'Editar Articulo',
    this.form_title = 'Actualiza el titulo',
    this.form_content =  'Actualiza el contenido';
    this.isEdit = true;
  }

  override ngOnInit(): void {
    super.getArticle();
  }

  override onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if (response.status === 'success') {
          this.status = 'success';
          this.article = response.article;
          //Alerta
          Swal.fire(
            'Articulo editado!!',
            'El articulo se ha editado correctamente',
            'success'
          )
          this._router.navigate(['/blog/articulo', this.article._id]);
        } else {
          this.status = 'error';
          Swal.fire(
            'Articulo no editado!!',
            'El articulo no se pudo actualizar con los nuevos datos',
            'error'
          )
        }
      },
      err => {
        console.log(err);
        this.status = 'error';
      }
    )
  }

  override imageUpload(data: any) {
    let image_data = data.body;
    this.article.image = image_data.image;
  }

}
