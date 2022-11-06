import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { PersonGeneratorComponent } from './person-generator.component';

describe('PersonGeneratorComponent', () => {
  let spectator: Spectator<PersonGeneratorComponent>;
  const createComponent = createComponentFactory({
    component: PersonGeneratorComponent,
    declarations: [PersonGeneratorComponent],
    imports: [
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      NoopAnimationsModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should build form', () => {
    const initFormSpy = jest.spyOn(spectator.component, 'initForm');
    spectator.component.ngOnInit();
    const countGroup = spectator.component.generatorFormGroup.get('count');
    const genderGroup = spectator.component.generatorFormGroup.get('gender');
    expect(countGroup.value).toEqual(1000);
    expect(genderGroup.get('male').value).toBe(true);
    expect(genderGroup.get('female').value).toBe(true);
    expect(initFormSpy).toHaveBeenCalled();
  });

  it('should be set count from form', () => {
    const emitSpy = jest.spyOn(spectator.component.generateRequest, 'emit');
    spectator.component.generatorFormGroup.patchValue({
      count: 1,
    });
    spectator.component.generate();
    expect(spectator.component.generatorFormGroup.get('count').value).toBe(1);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should be set gender male from form', () => {
    const emitSpy = jest.spyOn(spectator.component.generateRequest, 'emit');
    spectator.component.generatorFormGroup.patchValue({
      gender: { male: false },
    });
    spectator.component.generate();
    const genderGroup = spectator.component.generatorFormGroup.get('gender');
    expect(genderGroup.get('male').value).toBe(false);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should be set gender female from form', () => {
    const emitSpy = jest.spyOn(spectator.component.generateRequest, 'emit');
    spectator.component.generatorFormGroup.patchValue({
      gender: { female: false },
    });
    spectator.component.generate();
    const genderGroup = spectator.component.generatorFormGroup.get('gender');
    expect(genderGroup.get('female').value).toBe(false);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not emit configuration', () => {
    const emitSpy = jest.spyOn(spectator.component.generateRequest, 'emit');
    spectator.component.generatorFormGroup.patchValue({
      gender: {
        male: false,
        female: false,
      },
    });
    spectator.component.generate();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should be emit configuration', () => {
    const emitSpy = jest.spyOn(spectator.component.generateRequest, 'emit');
    spectator.component.generate();
    expect(emitSpy).toBeCalledWith({
      count: 1000,
      gender: { male: true, female: true },
    });
  });
});
