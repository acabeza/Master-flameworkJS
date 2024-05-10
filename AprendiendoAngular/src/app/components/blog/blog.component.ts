import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {

  public articles: Article[] = [];
  

  constructor(
    private _articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this._articleService.getArticles().subscribe({
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
