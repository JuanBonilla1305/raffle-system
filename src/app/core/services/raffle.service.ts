import { Injectable } from '@angular/core';
import { Raffle } from './raffle.model';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {

  private raffles: Raffle[] = [
    { id: 1, title: 'Rifa PS5', description: 'Gana una PS5', price: 10000 }
  ];

  getRaffles(): Raffle[] {
    return this.raffles;
  }
}
