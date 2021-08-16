export class ApiResponse<T> {
    error: boolean;
    errorMessages: string[];
    data: T;
}
