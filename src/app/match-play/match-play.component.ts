import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { StateConstantsEnum } from '../constants/state-enum';
import { MatchState} from '../models/match-created';
import { RegisterMove } from '../models/register-round-model';
import { ErrorService } from '../services/error-service.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match-play',
  templateUrl: './match-play.component.html',
  styleUrls: ['./match-play.component.css']
})
export class MatchPlayComponent implements OnInit {

  constructor(private router: Router, private matchService: MatchService, private errorService: ErrorService) {
  
  }

  info: MatchState;
  waiting: boolean;
  displayedColumns: any = ['round', 'winner']
  ngOnInit(): void {
    let i = localStorage['matchInfo'];
    console.log(i);
    if(i)
    {
      this.info = JSON.parse(i);
      if(this.info.isFinished){
        this.waiting = true;
      }
      console.log(this.info)
    }
    else
    {
      this.router.navigate(['/'])
    }
  }

  registerMove(move: number): void{
      this.waiting = true;
      let model: RegisterMove = {
        matchId: this.info.matchId,
        roundOrder: this.info.round,
        userMove: move,
        userOrder: this.info.userOrderTurn
      }
      this.matchService.registerRound(model).subscribe(x => {
        console.log('registed movement');
        console.log(x);
        if(x.error)
        {
          this.errorService.showErrorSwal(x.errorMessages)
          return;
        }
        this.info = x.data;
        /*
        let on: SweetAlertOptions = {
          html: `Round ${this.info.round}: [${this.parseStateRound(StateConstantsEnum[x.data.winnerOrder].toString())}]`,
          icon: 'success',
        };
        Swal.fire(on);*/
        if(!this.info.isFinished)
          this.waiting = false;
      }, error => {
        this.errorService.showErrorSwal(error.error.errorMessages)
        }
      );
  }
/*
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
*/
  redirectToWinner(){
    this.router.navigate(['winner']);
  }
}
