import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

export enum SortBy {
    Profit = 0,
    Cash = 1,
    Games = 2,
}

export class Stat {
    username: string = null;
    winnings: number = 0;
    gross: number = 0;
    highestWin: number = 0;
    gamesPlayed: number = 0;
}

@Injectable()
export class LeaderBoardsManager {

    constructor(private db: AngularFireDatabase){}

    getLeaderBoards(sortBy: SortBy): Observable<Stat[]>{
        console.log('getLeaderBoards')
        const order = 
            sortBy == SortBy.Profit ? 
                'winnings' : 
            sortBy == SortBy.Cash ? 
                'gross' : 
                'gamesPlayed';
        return this.db.list('real/stats',{query:{limitToLast:20,orderByChild:order}});
    }

    getStats(): Observable<Stat[]>{
        return this.db.list('real/stats');
    }
}