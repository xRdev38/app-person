import { PersonGenderPipe } from './person-gender.pipe';

describe('PersonGenderPipe', () => {
  it('create an instance', () => {
    const pipe = new PersonGenderPipe();
    expect(pipe).toBeTruthy();
  });
});
