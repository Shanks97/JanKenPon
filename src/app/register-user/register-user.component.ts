import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterUserModel } from '../models/register-user-model';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  
  checkoutForm = this.formBuilder.group({
    u_name1: 'juan cortes',
    u_name2: 'pepe mora',
  });

  constructor(
    private formBuilder: FormBuilder,
     private matchService: MatchService,
     private route: ActivatedRoute,
     private router: Router
     ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
   var u1: RegisterUserModel =  {
     user1: {
        name: this.checkoutForm.value['u_name1']
     },
     user2: {
       name: this.checkoutForm.value['u_name2']
     }
   };
   this.matchService.startMatch(u1).subscribe(x => {
    if(x.error)
    {
      let text = ''
      x.errorMessages.forEach(x => text += '\n'+ x);
      Swal.fire(text);
    }

    
    localStorage.setItem('matchId', x.data.matchId)
    localStorage.setItem('matchInfo', JSON.stringify(x.data));
    Swal.fire('Ready!');
    this.router.navigate(['play']);
   });   
  }
}
