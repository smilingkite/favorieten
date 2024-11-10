import { Component, EventEmitter, input, Output } from '@angular/core';
import { Favoriet } from '../favoriet';

@Component({
  selector: 'favorieten-widget',
  standalone: true,
  imports: [],
  templateUrl: './favorieten.component.html',
  styleUrl: './favorieten.component.scss',
})
export class FavorietenComponent {
  favorieten = input<Favoriet[]>([]);
  @Output() eenMeerOut = new EventEmitter<number>();
  @Output() eenMinderOut = new EventEmitter<number>();
  @Output() verwijderOut = new EventEmitter<number>();

  eenMeer(favoriet: Favoriet) {
    this.eenMeerOut.emit(favoriet.productId);
  }
  eenMinder(favoriet: Favoriet) {
    this.eenMinderOut.emit(favoriet.productId);
  }
  verwijder(favoriet: Favoriet) {
    this.verwijderOut.emit(favoriet.productId);
  }
}
