export class Request<T> {
  processId?: string;
  data?: T;

  constructor(processId: string, data: Partial<Request<T>>) {
    Object.assign(this, data);
  }
}

export type RequestType<T> = Request<T>;
