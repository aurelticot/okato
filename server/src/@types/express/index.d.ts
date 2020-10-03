declare namespace Express {
  export interface Request {
    startAt?: [number, number];
    requestId?: string;
  }
  export interface Response {
    startAt?: [number, number];
    requestId?: string;
  }
}
