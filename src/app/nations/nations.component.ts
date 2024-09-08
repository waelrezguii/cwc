import { Component } from '@angular/core';
import { Country } from '../models/country.model';
import { NationsService } from '../nations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nations',
  templateUrl: './nations.component.html',
  styleUrl: './nations.component.css'
})
export class NationsComponent {
  countries: Country[] = [];
  loading = true;

  constructor(
    private nationsService: NationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nationsService.getCountries().subscribe({
      next: countries => {
        this.countries = countries;
        this.loading = false;
      },
      error: error => {
        console.error('Error fetching countries:', error);
        this.loading = false;
      }
    });
  }

  viewPlayers(nation: string): void {
    this.router.navigate(['/players', 'nation',nation]);
  }
}
