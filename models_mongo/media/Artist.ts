import { Schema, models, model, Model, Types } from "mongoose";
// import User, { UserInterface } from "../users/User";
import Track, { TrackInterface } from "./Track";

export interface ArtistInterface {
	name: string;
	members?: string[];
	genre?: string;
	tracks: TrackInterface[];
}

type ArtistType = Model<ArtistInterface>;

const ArtistSchema = new Schema<ArtistInterface, ArtistType>({
	name: {
		type: String,
		required: true,
	},
	members: {
		type: [String],
		required: false,
	},
	genre: {
		type: String,
		required: false,
	},
});

export default models?.Artist || model<ArtistInterface>("Artist", ArtistSchema);
