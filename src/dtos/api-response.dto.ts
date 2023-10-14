export class ApiResponse<T> {
  constructor(
    public result: T,
    public message: string,
    public code?: number,
  ) {}
}
