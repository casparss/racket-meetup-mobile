import {NgModule} from '@angular/core';
import {LoginFormCom} from './login-form.component';
import {SignupFormCom} from './signup-form.component';
import {WelcomeCom} from './welcome.component';

@NgModule({
  declarations: [LoginFormCom, SignupFormCom, WelcomeCom],
  exports:[WelcomeCom]
})
export class WeclomeModule {}
