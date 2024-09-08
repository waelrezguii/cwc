import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Players } from './models/player.model';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private baseUrl = 'https://club-world-cup-2025.onrender.com/api/v1/players';
  
  constructor(private http: HttpClient) {}

  
  getPlayers(name?: string, team?: string, pos?: string, nation?: string): Observable<Players[]> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (team) params = params.set('team', team);
    if (pos) params = params.set('pos', pos);
    if (nation) params = params.set('nation', nation);

    return this.http.get<Players[]>(this.baseUrl, { params: params });
  }
  addPlayer(player: Players): Observable<Players> {
    return this.http.post<Players>(this.baseUrl, player);
  }

  updatePlayer(player: Players): Observable<Players> {
    return this.http.put<Players>(this.baseUrl, player);
  }

  deletePlayer(playerName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${playerName}`, { responseType: 'text' });
  }
}
