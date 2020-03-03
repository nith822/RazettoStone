import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationTextComponent } from './translation-text.component';

describe('TranslationTextComponent', () => {
  let component: TranslationTextComponent;
  let fixture: ComponentFixture<TranslationTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
