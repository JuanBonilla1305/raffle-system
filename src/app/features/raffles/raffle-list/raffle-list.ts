import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaffleService } from '@angular/build'
import { Raffle } from '../../../domain/models/raffle.model';

@Component({
  selector: 'app-raffle-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './raffle-list.html',
  styleUrls: ['./raffle-list.css'],
  providers: [RaffleService] // 👈 AGREGA ESTA LÍNEA
})

export class RaffleListComponent implements OnInit {

  rafflesWithProgress: (Raffle & { progress: number })[] = [];

  constructor(private raffleService: RaffleService) {}

  ngOnInit(): void {
    this.loadRaffles();
  }

  buyTicket(id: number): void {
    this.raffleService.buyTicket(id);
    this.loadRaffles();
  }

  loadRaffles(): void {
    const raffles: Raffle[] = this.raffleService.getRaffles();

    this.rafflesWithProgress = raffles.map((raffle: Raffle) => ({
      ...raffle,
      progress: (raffle.soldTickets / raffle.totalTickets) * 100
    }));
  }
}
