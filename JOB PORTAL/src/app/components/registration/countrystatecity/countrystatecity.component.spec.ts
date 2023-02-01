import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrystatecityComponent } from './countrystatecity.component';

describe('CountrystatecityComponent', () => {
  let component: CountrystatecityComponent;
  let fixture: ComponentFixture<CountrystatecityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrystatecityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrystatecityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
