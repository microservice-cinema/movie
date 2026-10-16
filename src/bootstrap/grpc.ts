import { PROTO_PATHS } from '@microservice-cinema/contracts'
import type { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type MicroserviceOptions, Transport } from '@nestjs/microservices'

export function setupGrpc(app: INestApplication, config: ConfigService) {
	const host = config.get('GRPC_HOST')
	const port = config.get('GRPC_PORT')

	const url = `${host}:${port}`

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			package: ['movie.v1', 'category.v1'],
			protoPath: [PROTO_PATHS.MOVIE, PROTO_PATHS.CATEGORY],
			url,
			loader: {
				keepCase: false,
				longs: String,
				enums: String,
				defaults: true,
				oneofs: true
			}
		}
	})
}
