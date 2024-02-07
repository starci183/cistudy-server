
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ContentType {
    Text = "Text",
    Video = "Video",
    Code = "Code",
    Image = "Image",
    Label = "Label",
    Application = "Application"
}

export enum UserRole {
    User = "User",
    Moderator = "Moderator",
    Administrator = "Administrator"
}

export enum UserKind {
    Local = "Local",
    Google = "Google",
    Facebook = "Facebook"
}

export enum VerifiedStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected"
}

export interface FindOneCourseInput {
    courseId: string;
}

export interface FindManyCoursesInput {
    filter?: Nullable<CourseFilterModel>;
}

export interface CourseFilterModel {
    category?: Nullable<string>;
}

export interface FindOnePostInput {
    postId: string;
}

export interface FindManyPostsInput {
    courseId: string;
    take: number;
    skip: number;
}

export interface PostContentModel {
    postContentId: string;
    index: number;
    content: string;
    contentType: ContentType;
    postId: string;
}

export interface UserModel {
    userId: string;
    email: string;
    password?: Nullable<string>;
    avatarUrl?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    balance?: Nullable<number>;
    role: UserRole;
    walletId?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    birthdate?: Nullable<DateTime>;
    verified: boolean;
    kind: UserKind;
    externalId?: Nullable<string>;
}

export interface CourseModel {
    courseId: string;
    title: string;
    thumbnailId?: Nullable<string>;
    description: string;
    price: number;
    verifiedStatus?: Nullable<VerifiedStatus>;
    isDraft: boolean;
    creator: UserModel;
    isDeleted: boolean;
    previewVideoId?: Nullable<string>;
    targets?: Nullable<string>;
    includes?: Nullable<string>;
}

export interface PostModel {
    postId: string;
    title: string;
    course: CourseModel;
    postContents: PostContentModel[];
    creator: UserModel;
}

export interface IQuery {
    findOneCourse(input: FindOneCourseInput): CourseModel | Promise<CourseModel>;
    findManyCourses(input?: Nullable<FindManyCoursesInput>): CourseModel[] | Promise<CourseModel[]>;
    findOnePost(input: FindOnePostInput): PostModel | Promise<PostModel>;
    findManyPosts(input: FindManyPostsInput): PostModel[] | Promise<PostModel[]>;
}

export type DateTime = any;
type Nullable<T> = T | null;
