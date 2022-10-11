export interface LoginData {
    login: string;
    password: string;
    deviceUuid?: string;
    rememberMe: boolean;
}

export interface AuthenticationResult {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpirationDate: Date;
    deviceUuid?: string;
}
