import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
})
export class HomeComponent implements OnInit {

  public title: string;
  public articles: Article[] = [];
  public homeText = 'Bienvenido al Curso de Angular';
  constructor(private _articleService: ArticleService) {
    this.title = 'Últimos artículos';
   }

  ngOnInit(): void {
    this._articleService.getArticles(true).subscribe({
      next: ((response: any) => {
        if (response.articles) {
          this.articles = response.articles;
        }
      }), 
      error: (err => {
        console.log(err);
      })
    });
  }

}
