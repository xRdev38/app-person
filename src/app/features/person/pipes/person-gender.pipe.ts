import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personGender',
})
export class PersonGenderPipe implements PipeTransform {
  gender: Record<string, string> = {
    Male: 'Homme',
    Female: 'Femme',
  };

  transform(value: string): string {
    if (this.gender?.[value]) {
      return this.gender[value];
    }
    return value;
  }
}
