import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeightService } from '../../service/weight.service';

export interface kilogramWeight {
  weight: number;
  color: string;
  size: string;
}

export interface poundWeight {
  weight: number;
  color: string;
  size: string;
}

@Component({
  selector: 'input-component',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './input.component.html',
})
export class inputComponent implements OnInit {
  weightToLoadKg: kilogramWeight[] = [];
  weightToLoadLbs: poundWeight[] = [];
  constructor(private weightService: WeightService) {}

  ngOnInit(): void {
    this.weightService.currentWeight$.subscribe((weight) => {
      // This will be triggered whenever the weight is updated
      this.weightToLoadKg = weight;
    });
  }
  kilogramWeightArray: kilogramWeight[] = [
    { weight: 25, color: 'bg-red-500', size: 'h-32' },
    { weight: 20, color: 'bg-blue-500', size: 'h-28' },
    { weight: 15, color: 'bg-yellow-500', size: 'h-24' },
    { weight: 10, color: 'bg-green-500', size: 'h-20' },
    { weight: 5, color: 'bg-white', size: 'h-16' },
    { weight: 2.5, color: 'bg-black', size: 'h-12' },
    { weight: 1.25, color: 'bg-gray-500', size: 'h-8' },
  ];

  poundWeightArray: poundWeight[] = [
    { weight: 45, color: 'bg-black', size: 'h-32' },
    { weight: 35, color: 'bg-black', size: 'h-28' },
    { weight: 25, color: 'bg-black', size: 'h-24' },
    { weight: 10, color: 'bg-black', size: 'h-20' },
    { weight: 5, color: 'bg-black', size: 'h-16' },
    { weight: 2.5, color: 'bg-black', size: 'h-12' },
  ];

  weight = '70kg';

  inputWeight(weight: string) {
    //inputComponent.weightToLoadLbs = [];

    if (weight == '') {
      this.weight = '70';
    } else {
      this.validateWeight(parseFloat(weight), 'kg');
    }

    console.log(this.weight);
  }

  validateWeight(weight: number, weightType: string) {
    if (weightType == 'kg') {
      if (weight % 2.5 != 0) {
        console.log('please enter a value in increments of 2.5');
      } else {
        this.loadWeight(weight, weightType);
        this.weight = weight.toString();
      }
    } else if (weightType == 'lbs') {
      if (weight % 5 != 0) {
        console.log('please enter a value in increments of 5');
      } else {
        this.weight = weight.toString();
      }
    }
  }

  loadWeight(weight: number, weightType: string) {
    if (weightType == 'kg') {
      let weightWithoutBar = weight - 20;

      let pointer = 0;
      const result = [];
      while (
        weightWithoutBar > 0 &&
        pointer < this.kilogramWeightArray.length
      ) {
        if (
          weightWithoutBar - this.kilogramWeightArray[pointer].weight * 2 >=
          0
        ) {
          weightWithoutBar =
            weightWithoutBar - this.kilogramWeightArray[pointer].weight * 2;
          result.push(this.kilogramWeightArray[pointer]);
        } else {
          pointer++;
        }
      }
      console.log(result);
      this.weightToLoadKg = result;
      this.weightService.updateWeight(this.weightToLoadKg);
      console.log(this.weightToLoadKg);
    } else {
      let weightWithoutBar = weight - 45;

      let pointer = 0;
      while (weightWithoutBar > 0 && pointer < this.poundWeightArray.length) {
        if (weightWithoutBar - this.poundWeightArray[pointer].weight * 2 >= 0) {
          weightWithoutBar =
            weightWithoutBar - this.poundWeightArray[pointer].weight * 2;
          this.weightToLoadLbs.push(this.poundWeightArray[pointer]);
        } else {
          pointer++;
        }
      }
    }
  }
}
