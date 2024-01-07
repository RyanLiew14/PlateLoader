import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { inputComponent, kilogramWeight } from '../input/input.component';
import { WeightService } from '../../service/weight.service';

@Component({
  selector: 'barbell-component',
  standalone: true,
  templateUrl: './barbell.component.html',
  imports: [CommonModule, RouterOutlet, inputComponent],
})
export class barbellComponent implements OnInit {
  title = 'plate-loader-app';
  weight: kilogramWeight[] = [];
  weightType: boolean = true;

  constructor(private weightService: WeightService) {}

  ngOnInit(): void {
    this.weightService.currentWeight$.subscribe((weight) => {
      this.weight = weight;
    });
    this.weightService.currentWeightType$.subscribe((weightType) => {
      this.weightType = weightType;
    });
  }
}
