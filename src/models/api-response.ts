export class ApiResponse<T>{
    result: T;
    error: ApiError;
}

export class ApiError{
    incidentId: string;
    type: string;
    message: string;
}