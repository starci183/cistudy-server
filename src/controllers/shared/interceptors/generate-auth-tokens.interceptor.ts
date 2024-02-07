import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common"
import { AuthManagerService } from "@global"
import { Observable, mergeMap } from "rxjs"
import { IOutput } from "@common"

@Injectable()
export default class GenerateAuthTokensInterceptor<T extends object>
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
		const clientId = query.clientId as string | undefined

		return next.handle().pipe(
			mergeMap(async (data) => {
				return await this.authManagerService.generateResponse<T>(
					data.userId,
					data,
					true,
					clientId,
				)
			}),
		)
	}
}
