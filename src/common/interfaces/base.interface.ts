import { AuthTokens } from "../types"

export interface IOutput<T> {
    data: T,
    tokens: AuthTokens 
}

export interface IAuthInput<T> {
    userId: string,
    data: T,
    files?: Array<Express.Multer.File>
}

export interface IInput<T> {
    data: T,
    files?: Array<Express.Multer.File>
}