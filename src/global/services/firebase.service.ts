import { servicesConfig } from "@config"
import { Injectable } from "@nestjs/common"
import * as admin from "firebase-admin"
import firebase, { ServiceAccount } from "firebase-admin"
import { Auth } from "firebase-admin/lib/auth/auth"
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier"

@Injectable()
export default class FirebaseService {
    auth: Auth
    constructor() {
        const adminConfig: ServiceAccount = {
            projectId: servicesConfig().firebase.projectId,
            privateKey: servicesConfig().firebase.privateKey.replace(/\\n/g, "\n"),
            clientEmail: servicesConfig().firebase.clientEmail,
        }

        let app: admin.app.App

        if (!admin.apps.length) {
            app = admin.initializeApp({
                credential: admin.credential.cert(adminConfig),
            })
        } else {
            app = admin.app()
        }

        this.auth = firebase.auth(app)
    }

    async verifyGoogleAccessToken(token: string): Promise<DecodedIdToken> {
        return await this.auth.verifyIdToken(token)
    }
}
