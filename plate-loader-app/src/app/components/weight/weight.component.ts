import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  inputComponent,
  kilogramWeight,
  kilogramWeightArray,
  poundWeight,
  poundWeightArray,
} from '../input/input.component';
import { WeightService } from '../../service/weight.service';

@Component({
  selector: 'weight-component',
  standalone: true,
  templateUrl: './weight.component.html',
  imports: [CommonModule, RouterOutlet, inputComponent],
})
export class weightComponent implements OnInit {
  weight: kilogramWeight[] | poundWeight[] = [];
  weightSelectionKg: kilogramWeight[] = kilogramWeightArray;
  weightSelectionLb: poundWeight[] = poundWeightArray;
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
