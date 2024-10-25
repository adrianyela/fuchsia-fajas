import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineasPage } from './lineas.page';

describe('LineasPage', () => {
  let component: LineasPage;
  let fixture: ComponentFixture<LineasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LineasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
