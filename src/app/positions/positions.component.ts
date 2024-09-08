import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent {
  positions = [
    { name: 'GK', image: 'assets/scw-126-a-deep-dive-into-a-goalkeepers-roles-1.png' },
    { name: 'DEF', image: 'assets/whats-the-importance-of-a-defender-in-modern-football.jpg' },
    { name: 'MID', image: 'assets/Andrea-Pirlo-min.jpg' },
    { name: 'ATT', image: 'assets/benzema_stiker_in_soccer.jpg' }
    
  ];

  constructor(private router: Router) {}

  viewPlayersByPosition(position: string): void {
    this.router.navigate(['/players/position', position]);
  }
}
