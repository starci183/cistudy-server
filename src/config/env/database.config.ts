export default () =>
	({
		mysql: {
			username: process.env.MYSQL_USERNAME,
			password: process.env.MYSQL_PASSWORD,
			schema: process.env.MYSQL_SCHEMA,
			host: process.env.MYSQL_HOST,
			port: Number.parseInt(process.env.MYSQL_PORT),
		},
		redis: {
			host: process.env.REDIS_HOST,
			port: Number.parseInt(process.env.REDIS_PORT)
		}
	})
