export class StateNotDefinedError extends Error {
  constructor (state: string) {
    super(`The state "${state}" was called but its null or undefined`);

    this.name = 'StateNotDefined';
  }
}
