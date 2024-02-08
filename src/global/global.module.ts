import { Global, Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import {
    CourseMySqlEntity,
    EnrolledInfoEntity,
    LectureMySqlEntity,
    PostCommentContentMySqlEntity,
    PostCommentLikeMySqlEntity,
    PostCommentMySqlEntity,
    PostContentMySqlEntity,
    PostLikeMySqlEntity,
    PostMySqlEntity,
    ResourceMySqlEntity,
    SectionMySqlEntity,
    SessionMySqlEntity,
    UserMySqlEntity
} from "@database"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
    AuthManagerService,
    Bento4Service,
    FfmpegService,
    FirebaseService,
    MailerService,
    Sha256Service,
    SupabaseService
} from "./services"
import ShellService from "./services/shell.service"

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            SessionMySqlEntity,
            UserMySqlEntity,
            PostCommentMySqlEntity,
            PostMySqlEntity,
            CourseMySqlEntity,
            EnrolledInfoEntity,
            SectionMySqlEntity,
            LectureMySqlEntity,
            ResourceMySqlEntity,
            PostContentMySqlEntity,
            PostLikeMySqlEntity,
            PostCommentMySqlEntity,
            PostCommentContentMySqlEntity,
            PostCommentLikeMySqlEntity
        ])
    ],
    exports: [
        JwtService,
        AuthManagerService,
        Bento4Service,
        FfmpegService,
        FirebaseService,
        MailerService,
        Sha256Service,
        ShellService,
        SupabaseService,
    ],
    providers: [
        JwtService,
        AuthManagerService,
        Bento4Service,
        FfmpegService,
        FirebaseService,
        MailerService,
        Sha256Service,
        ShellService,
        SupabaseService,
    ],
})
export default class GlobalModule { }
