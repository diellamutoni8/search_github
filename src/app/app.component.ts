import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GithubService],
})
export class AppComponent implements OnInit{
  profileData: any; repos: any; error: boolean; pages: any[]; currPage = 1; totPages = 0; private searchName: string;

  constructor(private service: GithubService) { }
  ngOnInit() {
    console.log(environment.API_KEY);
    this.search('diellamutoni8');
    //console.log(environment.API_KEY);
  }



  search(username) {
    if (username !== '') {
      this.searchName = username;
      this.service.getGithubProfile(username).then((res: any) => {
        this.profileData = res;
        this.totPages = Math.ceil(res.public_repos / 9);
        this.pages = this.range(0, this.totPages, 1);
      }).catch(err => {
        this.error = true;
      });

      this.getRepoPagination(1);
    }
  }

  getRepoPagination(page) {
    this.currPage = page;

    this.service.getGithubRepos(this.searchName, page).then((res: any) => {

      res.forEach(repo => {
        switch (repo.language) {
          case 'JavaScript':
            repo.color = 'yellow';
            break;
          case 'TypeScript':
            repo.color = 'green';
            break;
          case 'Java':
            repo.color = 'red';
            break;
          case null:
            break;
          default:
            repo.color = 'blue';
        }
      });
      this.repos = res;
    }).catch(err => {
      this.error = true;
    });
  }
  
  private range(start, stop, step) {
    if (stop === null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    const length = Math.max(Math.ceil((stop - start) / step), 0);
    const range = new Array(length);

    for (let idx = 0; idx < length; idx++ , start += step) {
      range[idx] = start;
    }

    return range;
  }

}
