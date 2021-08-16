import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchPlayComponent } from './match-play/match-play.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { WinnerComponent } from './winner/winner.component';

const routes: Routes = [
  { path: '', component: RegisterUserComponent },
  { path: 'play', component: MatchPlayComponent },
  { path: 'winner', component: WinnerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
