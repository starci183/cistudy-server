import { AuthTokenType, UserRole } from "../enums"

export type AuthTokens = {
    accessToken: string,
    refreshToken: string
}

export type Payload = {
    userId: string;
    userRole?: UserRole;
    type: AuthTokenType;
    iat: string;
    exp: string;
}