import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common"
import { AuthManagerService } from "@global"
import { Observable, mergeMap } from "rxjs"
import { AuthTokenType, Payload, IOutput } from "@common"

@Injectable()
export default class AuthInterceptor<T extends object>
implements NestInterceptor<T, IOutput<T>>
{
	constructor(
        private readonly authManagerService: AuthManagerService) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<IOutput<T>>> {
		const request = context.switchToHttp().getRequest()
		const query = request.query

		const { userId, type } = request.user as Payload

		const clientId = query.clientId as string | undefined
		const refresh = type === AuthTokenType.Refresh
		if (refresh) {
			await this.authManagerService.validateSession(userId, clientId)
		}

		return next.handle().pipe(
			mergeMap(async (data) => {
				return await this.authManagerService.generateResponse<T>(
					userId,
					data,
					refresh,
					clientId,
				)
			}),
		)
	}
}
