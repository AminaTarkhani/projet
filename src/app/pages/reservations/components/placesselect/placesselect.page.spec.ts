import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlacesselectPage } from './placesselect.page';

describe('PlacesselectPage', () => {
  let component: PlacesselectPage;
  let fixture: ComponentFixture<PlacesselectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlacesselectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
