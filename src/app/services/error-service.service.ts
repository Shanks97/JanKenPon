import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router) { }

    showErrorSwal(errors: string[], newGame: boolean = true){
    let _text = '';
    errors.forEach((message: any) => _text += `<li>${message}</li>`)
      let on: SweetAlertOptions = {
        html: `Errors:<br><ul type="circle">${_text}</ul><br> ${newGame ? 'Would you like to start a new game?' : ''}`,
        icon: 'error',
        showCancelButton: true
      };
      Swal.fire(on).then(result => {
        if(result.isConfirmed && newGame)
          this.router.navigate(['/'])
      });
  }
}
