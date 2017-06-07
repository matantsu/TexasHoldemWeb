import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from "@angular/http";

export class User {
    name: string = 'Matan Tsuberi';
    photoUrl: string = 'http://lorempixel.com/50/50'
}

@Injectable()
export class UserManager {
    user;

    constructor(private auth: AngularFireAuth){
        auth.authState.subscribe(u => this.user = u);
    }

    login(email: string, password: string) {
        return this.auth.auth.signInWithEmailAndPassword(email,password);
    }

    logout() {
        return this.auth.auth.signOut();
    }
}