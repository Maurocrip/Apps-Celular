import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Chat1Page } from './chat1.page';

describe('Chat1Page', () => {
  let component: Chat1Page;
  let fixture: ComponentFixture<Chat1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Chat1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
