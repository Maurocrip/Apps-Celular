import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisFotosPage } from './mis-fotos.page';

describe('MisFotosPage', () => {
  let component: MisFotosPage;
  let fixture: ComponentFixture<MisFotosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MisFotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
