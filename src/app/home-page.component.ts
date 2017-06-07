import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { LeaderBoardsManager, SortBy, Stat } from "app/bl/leaderboards-manager";
import 'rxjs/add/operator/first';

declare var jQuery: any;

@Component({
  selector: 'app-home-page',
  template: `
    <div class="ui vertical segment" [ngClass]="{loading: loading}">
      <div class="ui container">
        <div class="ui top attached tabular menu">
          <a class="item" (click)="leaderBoards = true" [ngClass]="{active: leaderBoards}">Leader Boards</a>
          <a class="item" (click)="leaderBoards = false" [ngClass]="{active: !leaderBoards}">User Statistics</a>
        </div>
        <div *ngIf="leaderBoards" class="ui bottom attached active tab segment" >
          <select #select class="ui dropdown" (change)="onChange($event.target.value)">
            <option value="">Profit</option>
            <option value="0">Profit</option>
            <option value="1">Cash</option>
            <option value="2">Games</option>
          </select>
          <table class="ui striped table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Games Played</th>
                <th>Total Gross</th>
                <th>Winnings</th>
                <th>Highest Win</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let stat of leaderboard; let i = index">
                <td>{{i + 1}}</td>
                <td>{{stat.username}}</td>
                <td>{{stat.gamesPlayed}}</td>
                <td>{{stat.gross}}</td>
                <td>{{stat.winnings}}</td>
                <td>{{stat.highestWin}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div *ngIf="!leaderBoards" class="ui bottom attached active tab segment" >
          <div class="ui icon input">
            <input type="text" placeholder="Filter..." [(ngModel)]="filterText">
          </div>
          <table class="ui striped table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Avg. cash gain per game</th>
                <th>Avg. gross profit</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let stat of filter(stats,filterText); let i = index">
                <td>{{i + 1}}</td>
                <td>{{stat.username}}</td>
                <td>{{stat.gamesPlayed == 0 ? 'No games played' : stat.winnings / stat.gamesPlayed}}</td>
                <td>{{stat.gamesPlayed == 0 ? 'No games played' : stat.gross / stat.gamesPlayed}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('select') select: ElementRef;
  loading = false;
  leaderBoards = true;
  leaderboard: Stat[] = [];
  stats: Stat[] = [];
  filterText = '';
  
  constructor(private lbm: LeaderBoardsManager) { }

  ngAfterViewInit() {
    jQuery(this.select.nativeElement).dropdown();
    this.onChange(SortBy.Profit);
    this.lbm.getStats()
      .first()
      .subscribe(stats => {
        this.loading = false;
        this.stats = stats;
      });
  }

  onChange(sortBy: SortBy) {
    this.loading = true;
    this.lbm.getLeaderBoards(sortBy)
      .first()
      .subscribe(stats => {
        this.loading = false;
        this.leaderboard = stats;
      });
  }

  filter(stats: Stat[], val: string){
    return stats.filter(x => x.username.indexOf(val) != -1);
  }
}
