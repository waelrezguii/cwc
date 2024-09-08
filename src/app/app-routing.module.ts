import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { NationsComponent } from './nations/nations.component';
import { TeamsComponent } from './teams/teams.component';
import { PositionsComponent } from './positions/positions.component';
import { LoginComponent } from './login/login.component';
import { AddplayerComponent } from './addplayer/addplayer.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'players/nation/:nation', component: PlayersComponent },
  { path: 'players/team/:teamname', component: PlayersComponent },
  { path: 'players/position/:position', component: PlayersComponent },
  {path:'nations',component:NationsComponent},
  {path:'teams',component:TeamsComponent},
  {path:'positions',component:PositionsComponent},
  {path:'login',component:LoginComponent},
  { path: 'add-player', component: AddplayerComponent, canActivate: [AuthGuard] } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
