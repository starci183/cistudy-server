import { Module } from "@nestjs/common"
import { BullModule } from "@nestjs/bull"
import { ProcessMpegDashModule } from "./process-mpeg-dash"

@Module({
    imports: [
        ProcessMpegDashModule
    ],
})
export default class WorkersModule { }