export class ApiRes<T> {
  constructor(
    public result: T,
    public message: string,
    public code?: number,
  ) {}
}
