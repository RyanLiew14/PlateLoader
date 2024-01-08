import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeightService } from '../../service/weight.service';

export interface kilogramWeight {
  weight: number;
  tailwindColor: string;
  size: string;
  color: string;
}

export interface poundWeight {
  weight: number;
  tailwindColor: string;
  size: string;
  color: string;
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
  weightMapKg = new Map();
  weightMapLbs = new Map();
  weightType: boolean = true;
  invalidEntry: boolean = false;
  constructor(private weightService: WeightService) {}

  ngOnInit(): void {
    this.weightService.currentWeight$.subscribe((weight) => {
      // This will be triggered whenever the weight is updated
      this.weightToLoadKg = weight;
    });
    this.weightService.currentWeightType$.subscribe((weightType) => {
      this.weightType = weightType;
    });
  }
  kilogramWeightArray: kilogramWeight[] = [
    { weight: 25, tailwindColor: 'bg-red-500', size: 'h-32', color: 'red' },
    { weight: 20, tailwindColor: 'bg-blue-500', size: 'h-28', color: 'blue' },
    {
      weight: 15,
      tailwindColor: 'bg-yellow-500',
      size: 'h-24',
      color: 'yellow',
    },
    { weight: 10, tailwindColor: 'bg-green-500', size: 'h-20', color: 'green' },
    {
      weight: 5,
      tailwindColor: 'bg-white border-2 border-black',
      size: 'h-16',
      color: 'white',
    },
    {
      weight: 2.5,
      tailwindColor: 'bg-black',
      size: 'h-12',
      color: 'black/collar',
    },
    {
      weight: 1.25,
      tailwindColor: 'bg-gray-500',
      size: 'h-8',
      color: 'silver',
    },
  ];

  poundWeightArray: poundWeight[] = [
    {
      weight: 45,
      tailwindColor: 'bg-black',
      size: 'h-32',
      color: 'black',
    },
    {
      weight: 35,
      tailwindColor: 'bg-black',
      size: 'h-28',
      color: 'black',
    },
    {
      weight: 25,
      tailwindColor: 'bg-black',
      size: 'h-24',
      color: 'black',
    },
    {
      weight: 10,
      tailwindColor: 'bg-black',
      size: 'h-20',
      color: 'black',
    },
    { weight: 5, tailwindColor: 'bg-black', size: 'h-16', color: 'black' },
    {
      weight: 2.5,
      tailwindColor: 'bg-black',
      size: 'h-12',
      color: 'black',
    },
  ];

  weight = '';

  inputWeight(weight: string) {
    this.validateWeight(parseFloat(weight), this.weightType);
  }

  validateWeight(weight: number, weightType: boolean) {
    if (weightType == true) {
      if (weight % 2.5 != 0) {
        this.invalidEntry = true;
      } else {
        this.invalidEntry = false;
        this.loadWeight(weight, weightType);
        this.weight = weight.toString() + 'kg';
      }
    } else if (weightType == false) {
      if (weight % 5 != 0) {
        this.invalidEntry = true;
      } else {
        this.invalidEntry = false;
        this.loadWeight(weight, weightType);
        this.weight = weight.toString() + 'lbs';
      }
    }
  }

  loadWeight(weight: number, weightType: boolean) {
    if (weightType == true) {
      let weightWithoutBar = weight - 20;

      let pointer = 0;
      const result = [];
      const map = new Map();
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

      result.map((x) => {
        console.log(x.tailwindColor);
        if (map.has(x.tailwindColor)) {
          map.set(x.tailwindColor, map.get(x.tailwindColor) + 1);
        } else {
          map.set(x.tailwindColor, 1);
        }
      });

      this.weightMapKg = map;
    } else {
      console.log('test');
      let weightWithoutBar = weight - 45;

      let result = [];
      let map = new Map();
      let pointer = 0;
      while (weightWithoutBar > 0 && pointer < this.poundWeightArray.length) {
        if (weightWithoutBar - this.poundWeightArray[pointer].weight * 2 >= 0) {
          weightWithoutBar =
            weightWithoutBar - this.poundWeightArray[pointer].weight * 2;
          result.push(this.poundWeightArray[pointer]);
        } else {
          pointer++;
        }
      }
      this.weightToLoadLbs = result;
      this.weightService.updateWeight(this.weightToLoadLbs);
      console.log(this.weightToLoadLbs);

      result.map((x) => {
        if (map.has(x.weight)) {
          map.set(x.weight, map.get(x.weight) + 1);
        } else {
          map.set(x.weight, 1);
        }
      });

      this.weightMapLbs = map;

      console.log(this.weightMapLbs);
    }
  }

  toggleWeightType() {
    this.weightType = !this.weightType;
    console.log(this.weightType);
    this.weightService.updateWeight([]);
    this.weightMapKg.clear();
    this.weightMapLbs.clear();
    this.weightService.updateWeightType();
  }
}
