import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperBoxPage } from './super-box.page';

describe('SuperBoxPage', () => {
  let component: SuperBoxPage;
  let fixture: ComponentFixture<SuperBoxPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuperBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
