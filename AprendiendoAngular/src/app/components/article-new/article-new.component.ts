import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article: Article;
  public status: string = '';
  constructor(private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.article = new Article('', '', '', '', null);
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this._articleService.create(this.article).subscribe(
      response => {
        if (response.status === 'success') {
          this.status = 'success';
          this.article = response.article;
          this._router.navigate(['/blog']);
        } else {
          this.status = 'error';
        }
      }, 
      err => {
        console.log(err);
        this.status = 'error';
      }
    )
  }

}
