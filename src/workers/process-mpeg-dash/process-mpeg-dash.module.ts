import { Global, Module } from "@nestjs/common"
import { BullModule } from "@nestjs/bull"
import ProcessMpegDashProducer from "./process-mpeg-dash.producer"
import ProcessMpegDashConsumer from "./process-mpeg-dash.consumer"
import { QUEUE_NAME } from "./process-mpeg-dash.constants"
import ProcessMpegDashService from "./process-mpeg-dash.service"

@Global()
@Module({
    imports: [
        BullModule.registerQueue({
            name: QUEUE_NAME,
        }),
    ],
    exports: [ProcessMpegDashProducer],
    providers: [
        ProcessMpegDashProducer,
        ProcessMpegDashConsumer,
        ProcessMpegDashService,
    ],
})
export default class ProcessMpegDashModule {}
