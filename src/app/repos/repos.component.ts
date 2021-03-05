import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {
  @Input() repos: any;
  constructor() { }

  ngOnInit(): void {
  }

}
