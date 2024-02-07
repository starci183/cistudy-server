import { Controller, NotFoundException } from "@nestjs/common"
import { CourseMySqlEntity, LectureMySqlEntity, SectionMySqlEntity } from "@database"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { SupabaseService } from "@global"
import { CreateCourseInput, CreateSectionInput, CreateLectureInput } from "./shared"
import { ProcessMpegDashProducer } from "@workers"

@Controller()
export default class CourseService {
    constructor(
		@InjectRepository(CourseMySqlEntity)
		private readonly courseMySqlRepository: Repository<CourseMySqlEntity>,
		@InjectRepository(SectionMySqlEntity)
		private readonly sectionMySqlRepository: Repository<SectionMySqlEntity>,
		@InjectRepository(LectureMySqlEntity)
		private readonly lectureMySqlRepository: Repository<LectureMySqlEntity>,
		private readonly supabaseService: SupabaseService,
		private readonly mpegDashProcessorProducer: ProcessMpegDashProducer,
    ) { }

    async createCourse(input: CreateCourseInput): Promise<string> {
        const { description, price, title } = input.data
        const promises: Array<Promise<void>> = []

        let thumbnailId: string
        const thumbnail = input.files.at(0)
        const uploadThumbnailPromise = async () => {
            const { assetId } = await this.supabaseService.upload(thumbnail)
            thumbnailId = assetId
        }
        promises.push(uploadThumbnailPromise())

        let previewVideoId: string
        const previewVideo = input.files.at(1)
        const uploadPreviewVideoPromise = async () => {
            const { assetId } = await this.supabaseService.upload(previewVideo)
            previewVideoId = assetId
        }
        promises.push(uploadPreviewVideoPromise())

        await Promise.all(promises)

        const created = await this.courseMySqlRepository.save({
            creatorId: input.userId,
            description,
            price,
            title,
            thumbnailId,
            previewVideoId,
        })

        if (created)
            return `A course with id ${created.courseId} has been creeated successfully.`
    }

    async createSection(input: CreateSectionInput): Promise<string> {
        const { courseId, title } = input.data
        const course = await this.courseMySqlRepository.findOneBy({
            courseId
        })
        if (!course) throw new NotFoundException("Course not found.")
        const created = await this.sectionMySqlRepository.save({
            courseId,
            title
        })
        if (created)
            return `A section with id ${created.sectionId} has been creeated successfully.`
    }

    async createLecture(input: CreateLectureInput): Promise<string> {
        const { title, sectionId } = input.data
        const promises: Array<Promise<void>> = []

        let videoId: string
        const video = input.files.at(0)
        console.log(video)
        const uploadVideoPromise = async () => {
            const { assetId } = await this.mpegDashProcessorProducer.add(video)
            videoId = assetId
        }
        promises.push(uploadVideoPromise())

        await Promise.all(promises)

        const created = await this.lectureMySqlRepository.save({
            videoId,
            title,
            sectionId
        })

        if (created)
            return `A lecture with id ${created.lectureId} has been creeated successfully.`
    }
}