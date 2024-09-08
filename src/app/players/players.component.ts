import { Component, OnInit } from '@angular/core';
import { Players } from '../models/player.model';
import { PlayersService } from '../players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Players[] = [];
  loading = true;
  isLoggedIn: boolean = false;
    playerForms: { [key: string]: FormGroup } = {};

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private userService:UsersService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.route.paramMap.subscribe(params => {
      const nation = params.get('nation');
      const teamname = params.get('teamname');
      const position = params.get('position');

      if (nation) {
        this.getPlayersByNation(nation);
      } else if (teamname) {
        this.getPlayersByTeam(teamname);
      } else if (position) {
        this.getPlayersByPosition(position);
      } else {
        this.getAllPlayers();
      }
    });
  }

  getPlayersByNation(nation: string): void {
    this.playersService.getPlayers(undefined, undefined, undefined, nation).subscribe(
      players => {
        this.players = players;
        this.initializeForms();
        this.loading = false;
        console.log('Players:', this.players);
      },
      error => {
        console.error('Error fetching players:', error);
        this.loading = false;
      }
    );
  }

  getPlayersByTeam(teamname: string): void {
    this.playersService.getPlayers(undefined, teamname).subscribe(
      players => {
        this.players = players;
        this.initializeForms();
        this.loading = false;
        console.log('Players:', this.players);
      },
      error => {
        console.error('Error fetching players:', error);
        this.loading = false;
      }
    );
  }

  getPlayersByPosition(position: string): void {
    this.playersService.getPlayers(undefined, undefined, position).subscribe(
      players => {
        this.players = players;
        this.initializeForms();
        this.loading = false;
        console.log('Players:', this.players);
      },
      error => {
        console.error('Error fetching players:', error);
        this.loading = false;
      }
    );
  }

  getAllPlayers(): void {
    this.playersService.getPlayers().subscribe(
      players => {
        this.players = players;
        this.initializeForms();
        this.loading = false;
        console.log('Players:', this.players);
      },
      error => {
        console.error('Error fetching players:', error);
        this.loading = false;
      }
    );
  }

  initializeForms(): void {
    this.players.forEach(player => {
      this.playerForms[player.player] = this.fb.group({
        player: [player.player],
        teamname: [player.teams.teamname],
        pos: [player.pos],
        nation: [player.nation]
      });
    });
  }

  toggleEdit(player: Players): void {
    console.log('Toggle edit called for:', player);
    const form = this.playerForms[player.player];
    if (form && form.dirty) {
      // Save the changes
      this.saveUpdate(player);
    } else {
      // Enable edit mode by marking the form as dirty
      form.markAsDirty();
      console.log('Edit mode enabled for:', form.value);
    }
  }

  saveUpdate(player: Players): void {
    const form = this.playerForms[player.player];
    if (form) {
      const updatedPlayer: Players = {
        ...player,
        ...form.value,
        teams: { teamname: form.value.teamname }
      };
      this.playersService.updatePlayer(updatedPlayer).subscribe(
        response => {
          console.log('Player updated:', response);
          form.markAsPristine();
          this.getAllPlayers();
        },
        error => {
          console.error('Error updating player:', error);
        }
      );
    }
  }

  deletePlayer(playerName: string): void {
    this.playersService.deletePlayer(playerName).subscribe(
      response => {
        console.log('Player deleted:', response);
        this.location.go(this.location.path()); // This will reload the current route
        window.location.reload(); // This will force a page reload
      },
      error => {
        console.error('Error deleting player:', error);
      }
    );
  }

  addPlayer(): void {
    this.router.navigate(['/add-player']);
  }

  trackByPlayer(index: number, player: Players): any {
    return player.player;
  }
}
