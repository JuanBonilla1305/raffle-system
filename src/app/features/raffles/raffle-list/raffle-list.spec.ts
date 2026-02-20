import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleList } from './raffle-list';

describe('RaffleList', () => {
  let component: RaffleList;
  let fixture: ComponentFixture<RaffleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaffleList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaffleList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
