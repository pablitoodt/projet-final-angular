import { Character, RickMortyService } from '@/services/rick-morty.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rick-morty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rick-morty.component.html',
  styleUrl: './rick-morty.component.css'
})

export class RickMortyComponent implements OnInit {
  characters$!: Observable<Character[]>;

  constructor(private rm: RickMortyService) {}

  ngOnInit(): void {
    this.characters$ = this.rm.getAll<Character>('character');
  }
}