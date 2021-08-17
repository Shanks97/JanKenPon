import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { MatchState, UserInformation } from '../models/match-created';
import { MatchWinner } from '../models/match-winner';
import { RegisterMove } from '../models/register-round-model';
import { RegisterUserModel } from '../models/register-user-model';
import { RoundStateModel } from '../models/round-state-model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  //url: string = 'http://localhost:5000'
  url: string = 'http://158.69.60.179:5001'
  constructor(private http: HttpClient) { }

  startMatch(model: RegisterUserModel): Observable<ApiResponse<MatchState>>{
    localStorage.removeItem('roundInfo');
    return this.http.post<ApiResponse<MatchState>>(`${this.url}/Match`, model);
  }

  registerRound(model: RegisterMove): Observable<ApiResponse<MatchState>>{
    return this.http.post<ApiResponse<MatchState>>(`${this.url}/Match/registerMove`, model);
  }

  getWinner(id: string): Observable<ApiResponse<UserInformation>>{
    return this.http.get<ApiResponse<UserInformation>>(`${this.url}/Match/getWinner/${id}`);
  }
}
