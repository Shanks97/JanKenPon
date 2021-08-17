import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatchState, UserInformation } from '../models/match-created';
import { MatchWinner } from '../models/match-winner';
import { RegisterUserModel } from '../models/register-user-model';
import { ErrorService } from '../services/error-service.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  info: UserInformation
  matchData: MatchState;
  constructor(private matchService: MatchService, private router: Router, private errorService: ErrorService) { }
  
  ngOnInit(): void {
    let i = localStorage['matchInfo'];
    console.log(i);
    this.matchData = JSON.parse(i);
    let id = localStorage['matchId'];
    this.matchService.getWinner(id).subscribe(x => {
      this.info = x.data
      console.log('this.matchData');
      console.log(this.matchData);
    }, err => {

    });
    
  }

  playAgain(): void {
    var u1: RegisterUserModel =  {
      user1: {
         name: this.matchData.user1.completeName
      },
      user2: {
        name: this.matchData.user2.completeName
      }
    };
    this.matchService.startMatch(u1).subscribe(x => {
     if(x.error)
     {
       this.errorService.showErrorSwal(x.errorMessages)
       return;
     }
 
     localStorage.setItem('matchId', x.data.matchId)
     localStorage.setItem('matchInfo', JSON.stringify(x.data));
     Swal.fire('Ready!');
     this.router.navigate(['play']);
    }, error => this.errorService.showErrorSwal(error.error.errorMessages));   
   }

  newGame(){
    localStorage.removeItem('roundInfo')
    localStorage.removeItem('matchId')
    localStorage.removeItem('matchInfo');
    this.router.navigate(['/'])
  }


}
