import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'input-component',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './input.component.html',
})
export class inputComponent {
  weight = '70kg';
  inputWeight(weight: string) {
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
}
