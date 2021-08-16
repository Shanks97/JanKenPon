import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { StateConstantsEnum } from '../constants/state-enum';
import { MatchCreated } from '../models/match-created';
import { RegisterRound } from '../models/register-round-model';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match-play',
  templateUrl: './match-play.component.html',
  styleUrls: ['./match-play.component.css']
})
export class MatchPlayComponent implements OnInit {

  constructor(private router: Router, private matchService: MatchService) {
  
  }

  info: MatchCreated;
  round: number;
  userOrder: number;
  user1Move: number;
  user2Move: number;
  waiting: boolean;
  rounds: any[] = [];
  roundInd: string = 'roundInfo'

  ngOnInit(): void {
    let i = localStorage['matchInfo'];
    console.log(i);
    this.round = 0;
    if(i)
    {
      this.info = JSON.parse(i);
      if(localStorage[this.roundInd]){
        this.rounds = JSON.parse(localStorage[this.roundInd]);
        this.round = this.rounds.length;
        if(this.round >= 3) 
          this.waiting = true;
      }
    }
    else
    {
      this.router.navigate(['/'])
    }

    this.userOrder = 1;
  }

  registerMove(move: number): void{
    if(this.userOrder == 1)
    {
      this.user1Move = move;
      this.userOrder = 2;
    }
    else
    {
      this.user2Move = move;
      this.userOrder = 1;
      this.waiting = true;
      let model: RegisterRound = {
        matchId: this.info.matchId,
        user1Move: this.user1Move,
        user2Move: this.user2Move
      }
      this.matchService.registerRound(model).subscribe(x => {
        this.round = x.data.round;
        let on: SweetAlertOptions = {
          html: `Round ${this.round}: [${this.parseStateRound(StateConstantsEnum[x.data.winnerOrder].toString())}]`,
          icon: 'success',
        };
        Swal.fire(on);
        let _winner = 'DRAW';
        switch(x.data.winnerOrder){
          case 1: _winner = this.info.user1.completeName; break;
          case 2: _winner = this.info.user2.completeName; break;
        }
        this.rounds.push(_winner)
        localStorage.setItem(this.roundInd, JSON.stringify(this.rounds));
        if(x.data.round < 3)
          this.waiting = false;
        else{

          }
      }, error => {
        let _text = '';
        error.error.errorMessages.forEach((message: any) => _text += `<il>${message}</il>`)
          let on: SweetAlertOptions = {
            html: `Errors:<br><ul type="circle">${_text}</ul><br> Would you like to start a new game?`,
            icon: 'error',
            showCancelButton: true
          };
          Swal.fire(on).then(result => {
            if(result.isConfirmed)
              this.router.navigate(['/'])
          });
        }
      );
    }
  }

  parseStateRound(state: string){
    console.log(state)
    console.log(StateConstantsEnum[StateConstantsEnum.DRAW])

    switch(state){
      case StateConstantsEnum[StateConstantsEnum.DRAW].toString(): return "Draw";
      case StateConstantsEnum[StateConstantsEnum.USER1_WINS].toString(): return this.info.user1.completeName;
      case StateConstantsEnum[StateConstantsEnum.USER2_WINS].toString(): return this.info.user2.completeName;
    }
    return state;
  }

  redirectToWinner(){
    this.router.navigate(['winner']);
  }
}
