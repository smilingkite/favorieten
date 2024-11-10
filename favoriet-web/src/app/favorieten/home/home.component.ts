import {
  Component,
  computed,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Product } from '../product';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { FavorietService } from '../favoriet.service';
import { Favoriet } from '../favoriet';
import { producten } from '../../producten';
import { FavorietenComponent } from '../favorieten/favorieten.component';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, FavorietenComponent],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  displayColumns: String[] = ['name'];
  showWidget: boolean = false;
  productenDataSource = new MatTableDataSource<Product>(producten);

  constructor(private FavorietService: FavorietService) {}

  favorieten: WritableSignal<Favoriet[]> = signal([]);

  totaal: Signal<number> = computed(() => {
    return this.favorieten().reduce((a, b) => a + b.aantal, 0);
  });

  getBestaandeFavoriet(id: number) {
    return this.favorieten().filter((f: Favoriet) => f.productId == id)[0];
  }

  ngAfterViewInit(): void {
    this.FavorietService.fetchAllFavorieten().subscribe((data) => {
      this.favorieten.set(data);
    });
  }

  incrementFavoriet(productId: number): void {
    const bestaandeFavoriet = this.getBestaandeFavoriet(productId);
    const favoriet: Favoriet = {
      productId: productId,
      aantal: bestaandeFavoriet.aantal + 1,
    };
    this.FavorietService.updateFavoriet(favoriet).subscribe({
      next: (_) => {
        this.favorieten.set(
          this.favorieten().map((fav) => {
            if (fav.productId == productId) {
              return Object.assign({}, favoriet);
            }
            return fav;
          }),
        );
      },
    });
  }

  decrementFavoriet(productId: number): void {
    const bestaandeFavoriet = this.getBestaandeFavoriet(productId);

    const nieuwAantal = bestaandeFavoriet.aantal - 1;
    if (nieuwAantal > 0) {
      const favoriet: Favoriet = {
        productId: productId,
        aantal: bestaandeFavoriet.aantal - 1,
      };
      this.FavorietService.updateFavoriet(favoriet).subscribe({
        next: (_) => {
          this.favorieten.set(
            this.favorieten().map((fav) => {
              if (fav.productId == productId) {
                return Object.assign({}, favoriet);
              }
              return fav;
            }),
          );
        },
      });
    } else {
      this.verwijderFavoriet(productId);
    }
  }

  verwijderFavoriet(productId: number): void {
    this.FavorietService.deleteFavoriet(productId).subscribe({
      next: (_) => {
        this.favorieten.set(
          this.favorieten().filter((fav) => fav.productId != productId),
        );
      },
    });
  }

  maakFavoriet(productId: number): void {
    const bestaandeFavoriet = this.getBestaandeFavoriet(productId);
    if (bestaandeFavoriet) {
      this.incrementFavoriet(productId);
    } else {
      this.FavorietService.createFavoriet({
        productId: productId,
        aantal: 1,
      }).subscribe({
        next: (data) => {
          this.favorieten.set([...this.favorieten(), data]);
        },
      });
    }
  }

  clickTotaal() {
    this.showWidget = !this.showWidget;
  }
}
