import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoginFormCom } from './login-form.component';
import { SignupFormCom } from './signup-form.component';
import { WelcomeCom } from './welcome.component';
import { RootNavSvc } from './root-nav.service';

@NgModule({
  declarations: [LoginFormCom, SignupFormCom, WelcomeCom],
  entryComponents: [WelcomeCom],
  imports: [IonicModule],
  exports: [WelcomeCom],
  providers: [RootNavSvc]
})
export class WelcomeModule {}
