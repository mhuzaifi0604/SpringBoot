import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLoggerComponent } from './audit-logger.component';

describe('AuditLoggerComponent', () => {
  let component: AuditLoggerComponent;
  let fixture: ComponentFixture<AuditLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditLoggerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuditLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
