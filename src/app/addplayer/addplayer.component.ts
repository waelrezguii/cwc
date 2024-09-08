import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Players } from '../models/player.model';
import { Teams } from '../models/team.model';
import { PlayersService } from '../players.service';
import { TeamsService } from '../teams.service';
import { Location } from '@angular/common'; // Import Location for navigating back

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.css']
})
export class AddplayerComponent implements OnInit {
  addPlayerForm: FormGroup;
  teams: Teams[] = [];

  constructor(
    private fb: FormBuilder,
    private playersService: PlayersService,
    private teamsService: TeamsService,
    private router: Router,
    private location: Location // Inject Location service
  ) {
    this.addPlayerForm = this.fb.group({
      player: ['', Validators.required],
      value: ['', Validators.required],
      teamname: ['', Validators.required],
      pos: ['', Validators.required],
      nation: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchTeams();
  }

  fetchTeams(): void {
    this.teamsService.getTeams().subscribe(
      (teams) => {
        this.teams = teams;
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.addPlayerForm.valid) {
      const selectedTeam = this.teams.find(team => team.teamname === this.addPlayerForm.value.teamname);

      if (!selectedTeam) {
        console.error('Selected team not found.');
        return;
      }

      const newPlayer: Players = {
        player: this.addPlayerForm.value.player,
        value: this.addPlayerForm.value.value,
        teams: {
          teamname: selectedTeam.teamname,
          idt: selectedTeam.idt,
          image: selectedTeam.image
        },
        pos: this.addPlayerForm.value.pos,
        nation: this.addPlayerForm.value.nation
      };

      this.playersService.addPlayer(newPlayer).subscribe(
        (response) => {
          console.log('Player added:', response);
          this.location.back(); // Navigate back to the previous page
        },
        (error) => {
          console.error('Error adding player:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
