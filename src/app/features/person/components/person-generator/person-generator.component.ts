import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GenerationConfig, Filters } from '../../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-person-generator',
  templateUrl: './person-generator.component.html',
  styleUrls: ['./person-generator.component.scss'],
})
export class PersonGeneratorComponent implements OnInit {
  generatorFormGroup: FormGroup;

  @Input() set columns(value: string[]) {
    this._filteredStates$.next(this.createFilters(value));
  }

  @Output()
  generateRequest = new EventEmitter<GenerationConfig>();

  @Output()
  filtersRequest = new EventEmitter<string>();

  private readonly _filteredStates$ = new BehaviorSubject<Filters[]>([]);

  constructor(private readonly formBuilder: FormBuilder) {}

  get filteredStates$(): Observable<Filters[]> {
    return this._filteredStates$.asObservable();
  }

  get count(): FormControl {
    return this.generatorFormGroup.get('count') as FormControl;
  }

  get male(): FormControl {
    return this.generatorFormGroup.get('gender').get('male') as FormControl;
  }

  get female(): FormControl {
    return this.generatorFormGroup.get('gender').get('female') as FormControl;
  }

  get gender(): FormGroup {
    return this.generatorFormGroup.get('gender') as FormGroup;
  }

  ngOnInit() {
    this.initForm();

    this.generatorFormGroup.valueChanges.subscribe({
      next: value => {
        this.setErrors(value.gender);
      },
    });
  }

  setErrors(gender: { [key: string]: boolean }) {
    if (gender.male === false && gender.female === false) {
      this.gender.setErrors({ required: true });
    } else {
      this.gender.setErrors(null);
    }
  }

  initForm(): void {
    this.generatorFormGroup = this.formBuilder.group({
      count: new FormControl(1000, [
        Validators.min(1),
        Validators.max(1000),
        Validators.required,
      ]),
      filters: new FormControl(null, []),
      gender: this.formBuilder.group({
        male: new FormControl(true),
        female: new FormControl(true),
      }),
    });
  }

  generate() {
    if (this.generatorFormGroup.invalid) {
      return;
    }
    const value: GenerationConfig = this.generatorFormGroup.value;
    this.generateRequest.emit(value);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtersRequest.emit(filterValue);
  }

  private createFilters(columns: string[]): Filters[] {
    return columns.map((value: string) => {
      return {
        name: value,
      };
    });
  }
}
