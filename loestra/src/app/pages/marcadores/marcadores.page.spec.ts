import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarcadoresPage } from './marcadores.page';

describe('MarcadoresPage', () => {
  let component: MarcadoresPage;
  let fixture: ComponentFixture<MarcadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarcadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
