import { Injectable } from "@nestjs/common"
import { InjectQueue } from "@nestjs/bull"
import { Queue } from "bull"
import ProcessMpegDashService from "./process-mpeg-dash.service"
import { QUEUE_NAME } from "./process-mpeg-dash.constants"

@Injectable()
export default class ProcessMpegDashProducer {
    constructor(
        private readonly mpegDashProcessorService: ProcessMpegDashService,
        @InjectQueue(QUEUE_NAME) private readonly convertQueue: Queue
    ) { }

    async add(file: Express.Multer.File) {
        const metadata = await this.mpegDashProcessorService.createTask(file)
        await this.convertQueue.add(metadata)
        //await this.processService.processVideo(metadata)
        return metadata
    }
}   