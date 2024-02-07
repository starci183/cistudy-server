import { Module } from "@nestjs/common"
import { ProcessMpegDashModule } from "./process-mpeg-dash"

@Module({
    imports: [ProcessMpegDashModule],
})
export default class WorkersModule {}
