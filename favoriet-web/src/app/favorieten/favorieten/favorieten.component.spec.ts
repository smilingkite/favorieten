import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavorietenComponent } from './favorieten.component';

describe('FavorietenComponent', () => {
  let component: FavorietenComponent;
  let fixture: ComponentFixture<FavorietenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavorietenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavorietenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
