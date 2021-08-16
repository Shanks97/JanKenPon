import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { MatchCreated } from '../models/match-created';
import { MatchWinner } from '../models/match-winner';
import { RegisterRound } from '../models/register-round-model';
import { RegisterUserModel } from '../models/register-user-model';
import { RoundStateModel } from '../models/round-state-model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  url: string = 'http://localhost:5000'
  constructor(private http: HttpClient) { }

  startMatch(model: RegisterUserModel): Observable<ApiResponse<MatchCreated>>{
    localStorage.removeItem('roundInfo');
    return this.http.post<ApiResponse<MatchCreated>>(`${this.url}/Match`, model);
  }

  registerRound(model: RegisterRound): Observable<ApiResponse<RoundStateModel>>{
    return this.http.post<ApiResponse<RoundStateModel>>(`${this.url}/Round`, model);
  }

  getWinner(id: string): Observable<ApiResponse<MatchWinner>>{
    return this.http.get<ApiResponse<MatchWinner>>(`${this.url}/Match/getWinner/${id}`);
  }
}
