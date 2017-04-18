import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {LoginFormCom} from './login-form.component';
import {SignupFormCom} from './signup-form.component';
import {WelcomeCom} from './welcome.component';

@NgModule({
  declarations: [LoginFormCom, SignupFormCom, WelcomeCom],
  imports: [IonicModule],
  exports:[WelcomeCom]
})
export class WelcomeModule {}
