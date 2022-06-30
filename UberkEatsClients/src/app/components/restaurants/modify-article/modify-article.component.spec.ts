import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyArticleComponent } from './modify-article.component';

describe('ModifyArticleComponent', () => {
  let component: ModifyArticleComponent;
  let fixture: ComponentFixture<ModifyArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
