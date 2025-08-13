
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/component/Service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SkiNet';

  constructor( private AuthService: AuthService) { }

  ngOnInit(): void {

    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if(token!=null){
    this.AuthService.loadCurrentUser(token).subscribe(() => {
      console.log('loaded user');
      

    }, error => {
      console.log(error);
    })
  }
  }

  
}
