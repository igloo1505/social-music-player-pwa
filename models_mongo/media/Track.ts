import { Schema, models, model, Model, Types } from "mongoose";
import User, { UserInterface } from "../users/User";
import Artist, { ArtistInterface } from "./Artist";

export interface TrackInterface {
	artist: ArtistInterface[];
	title: string;
	album: string;
	path: string;
	postedDate: Date;
	postedBy: UserInterface;
}

type TrackTypeOverride = {
	// artist: Types.Subdocument<Types.ObjectId> & ArtistInterface;
	artist: Types.DocumentArray<ArtistInterface>;
};

type TrackType = Model<TrackInterface, {}, TrackTypeOverride>;

const TrackSchema = new Schema<TrackInterface, TrackType>({
	artist: {
		// Keeping this an array for cases of collabs
		type: [Artist],
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	album: {
		type: String,
		required: false,
	},
	postedDate: {
		type: Date,
		default: new Date(),
	},
	path: {
		type: String,
		required: true,
	},
	postedBy: {
		type: User,
		required: true,
	},
});

export default models?.Track ||
	model<TrackInterface, TrackType>("Track", TrackSchema);
