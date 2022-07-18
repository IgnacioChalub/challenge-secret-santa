import { HttpException, HttpStatus } from "@nestjs/common";

export class ApiError extends HttpException {
  constructor(public readonly code: number, public readonly message: string) {
    super(message, code);
  }
}

export class InvalidModelError extends ApiError {
  constructor(model: string) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      `Invalid Model Error: model ${model} is invalid`
    );
  }
}

export class ValidationError extends ApiError {
  constructor(model: string, field: string, message: string) {
    super(
      HttpStatus.BAD_REQUEST,
      `Validation Error: model ${model} field ${field} ${message}`
    );
  }
}

export class NotFoundError extends ApiError {
  constructor(model: string) {
    super(HttpStatus.NOT_FOUND, `Not Found Error: ${model} not found`);
  }
}

export class YearAlreadyRaffled extends ApiError {
  constructor(groupId: string, year: number) {
    super(HttpStatus.BAD_REQUEST, `Group ${groupId} already raffled in ${year}`);
  }
}

export class CanNotRaffle extends ApiError {
  constructor(groupId: string, year: number) {
    super(HttpStatus.BAD_REQUEST, `Group ${groupId} can not match conditions to be raffled in year ${year}`);
  }
}