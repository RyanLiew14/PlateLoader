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
  currentWeight$: Observable<kilogramWeight[] | poundWeight[]> =
    this.currentWeightSubject.asObservable();

  getCurrentWeight(): kilogramWeight[] | poundWeight[] {
    return this.currentWeightSubject.value;
  }

  updateWeight(weight: kilogramWeight[] | poundWeight[]): void {
    this.currentWeightSubject.next(weight);
  }
}
