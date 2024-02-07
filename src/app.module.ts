import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { appConfig, databaseConfig, extnameConfig, jwtConfig, servicesConfig, videoConfig } from "./config"
import { ConfigModule } from "@nestjs/config"
import { GlobalModule } from "@global"
import ControllersModule from "./controllers/controllers.module"
import { ResolversModule } from "./resolvers"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { BullModule } from "@nestjs/bull"
import WorkersModule from "./workers/workers.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			load: [
				databaseConfig,
				jwtConfig,
				servicesConfig, 
				appConfig
			]
		}),

		BullModule.forRoot({
			redis: {
				host: databaseConfig().redis.host,
				port: databaseConfig().redis.port
			}
		}),
    
		TypeOrmModule.forRoot({
			type: "mysql",
			host: databaseConfig().mysql.host,
			port: databaseConfig().mysql.port,
			username: databaseConfig().mysql.username,
			password: databaseConfig().mysql.password,
			database: databaseConfig().mysql.schema,
			autoLoadEntities: true,
			synchronize: true,
		}),

		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			typePaths: ["./**/*.gql"],
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
		}),

		ResolversModule,
		GlobalModule,
		ControllersModule,
		WorkersModule
	],


	controllers: [],
	providers: [],
})
export default class AppModule { }
