import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { headerComponent } from './components/header/header.component';
import { inputComponent } from './components/input/input.component';
import { barbellComponent } from './components/barbell/barbell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    headerComponent,
    inputComponent,
    barbellComponent,
  ],
})
export class AppComponent {
  title = 'plate-loader-app';
}
