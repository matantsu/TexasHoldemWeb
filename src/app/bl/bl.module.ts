import { NgModule } from "@angular/core";
import { HttpModule, JsonpModule } from "@angular/http";
import { UserManager } from "app/bl/user-manager";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LeaderBoardsManager } from "app/bl/leaderboards-manager";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDNeJein6-7c543frBjRY-YMj30GV-9XZI",
    authDomain: "texasholdem-7ff59.firebaseapp.com",
    databaseURL: "https://texasholdem-7ff59.firebaseio.com",
    projectId: "texasholdem-7ff59",
    storageBucket: "texasholdem-7ff59.appspot.com",
    messagingSenderId: "989213145723"
  }
};

@NgModule({
  declarations: [
  ],
  imports: [
    HttpModule,
    JsonpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    UserManager,
    LeaderBoardsManager,
  ],
  bootstrap: []
})
export class BLModule { }
