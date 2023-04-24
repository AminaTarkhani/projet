import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ProspectionPage } from './prospection.page';

describe('ProspectionPage', () => {
  let component: ProspectionPage;
  let fixture: ComponentFixture<ProspectionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
