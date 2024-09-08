import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../teams.service';
import { Teams } from '../models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Teams[] = [];

  constructor(private teamsService: TeamsService, private router: Router) { }

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  viewPlayersByTeam(teamname: string): void {
    this.router.navigate(['/players', 'team',teamname]);
  }
}
