import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'levels',
  templateUrl: './levels.component.html'
})
export class LevelsComponent implements OnInit {
  levels: any = [];

  constructor(
    private db: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    let noOfLevels = 6;
    let levelsCompleted: any = this.db.get('levelsCompleted', 'number');

    for (let i = 1; i <= noOfLevels; i++) {
      let levelObj: any = {
        id: i
      };

      if (levelsCompleted >= i) {
        levelObj.isCompleted = true;
      } else if (levelsCompleted === (i - 1)) {
        levelObj.isOpen = true;
      } else if (levelsCompleted < i) {
        levelObj.isLocked = true;
      }

      this.levels.push(levelObj);
    }
  }

  goToLevel(level: number, isLocked: boolean) {
    if (isLocked) {
      return;
    }

    if (this.db.get(`visitedLevel${level}`, 'boolean')) {
      this.router.navigate([`level/${level}`]);
    } else {
      this.router.navigate([`level/${level}/instructions`]);
    }
  }
}