import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzerDashboardComponent } from './analyzer-dashboard.component';

describe('AnalyzerDashboardComponent', () => {
  let component: AnalyzerDashboardComponent;
  let fixture: ComponentFixture<AnalyzerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
