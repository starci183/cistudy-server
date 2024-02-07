import { join } from "path";

export default () => ({
    processMpegDashTasksDirectory: join(process.cwd(), "tasks", "process-mpeg-dash")
})