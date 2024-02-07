import { registerEnumType } from "@nestjs/graphql"

export enum UserKind {
  Local = "Local",
  Google = "Google",
  Facebook = "Facebook",
}

registerEnumType(UserKind, {
	name: "UserKind",
})

export enum UserRole {
  User = "User",
  Moderator = "Moderator",
  Administrator = "Administrator",
}

registerEnumType(UserRole, {
	name: "UserRole",
})


export enum VerifiedStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected",
  }
  
registerEnumType(VerifiedStatus, {
	name: "VerifiedStatus",
})
  
export enum ContentType {
    Text = "Text",
    Video = "Video",
    Code = "Code",
    Image = "Image",
    Label = "Label",
    Application = "Application",
  }
  
registerEnumType(ContentType, {
	name: "ContentType",
})
  