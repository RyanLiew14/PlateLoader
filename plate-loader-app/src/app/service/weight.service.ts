import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  kilogramWeight,
  poundWeight,
} from '../components/input/input.component';

@Injectable({ providedIn: 'root' })
export class WeightService {
  private currentWeightSubject: BehaviorSubject<
    kilogramWeight[] | poundWeight[]
  > = new BehaviorSubject<kilogramWeight[] | poundWeight[]>([]);

  //true = kg, false = lbs, we are using a toggle
  private currentWeightTypeSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  currentWeight$: Observable<kilogramWeight[] | poundWeight[]> =
    this.currentWeightSubject.asObservable();

  currentWeightType$: Observable<boolean> =
    this.currentWeightTypeSubject.asObservable();

  getCurrentWeight(): kilogramWeight[] | poundWeight[] {
    return this.currentWeightSubject.value;
  }

  getCurrentWeightType(): boolean {
    return this.currentWeightTypeSubject.value;
  }

  updateWeight(weight: kilogramWeight[] | poundWeight[]): void {
    this.currentWeightSubject.next(weight);
  }

  updateWeightType(): void {
    this.currentWeightTypeSubject.next(!this.currentWeightTypeSubject.value);
  }
}
