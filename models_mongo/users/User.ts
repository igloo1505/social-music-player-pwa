import { Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInterface {
	name: {
		first: string;
		last: string;
	};
	email: string;
	password: string;
	accountCreated: Date;
}

const UserSchema = new Schema<UserInterface>({
	name: {
		first: {
			type: String,
			required: true,
		},
		last: {
			type: String,
			required: true,
		},
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	accountCreated: {
		type: Date,
		default: new Date(),
	},
});

UserSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(this.password, salt);
		console.log(
			`User password of ${this.password} hashed to ${hashedPassword}`
		);
		this.password = hashedPassword;
		next();
	}
});

export default models?.User || model<UserInterface>("User", UserSchema);
