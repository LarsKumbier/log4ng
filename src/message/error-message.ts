import { Message } from './message';
import { Level } from './level';

export class ErrorMessage extends Message implements Error {
  name: string;
  message: string;
  stack: string;

  constructor(error: Error) {
    super(error.message, Level.Error);

    this.name = error.name;
    if (error.stack) {
      this.stack = error.stack;
    }
  }

  toString(): string {
    if (this.stack) {
      return this.stack;
    }
    return `${this.name}: ${this.message}`;
  }
}
