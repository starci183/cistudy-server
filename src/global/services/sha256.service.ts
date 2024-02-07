import { Injectable } from "@nestjs/common"
import * as crypto from "crypto"

@Injectable()
export default class Sha256Service {
	createHash(data: string): string {
		const hash = crypto.createHash("sha256")
		hash.update(data)
		return hash.digest("hex")
	}

	verifyHash(data: string, hashedValue: string): boolean {
		const hash = crypto.createHash("sha256")
		hash.update(data)
		const calculatedHash = hash.digest("hex")
		return hashedValue === calculatedHash
	}
}