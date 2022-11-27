import { Schema, models, model } from "mongoose";
import Track, { TrackInterface } from "./Track";

interface PlaylistInterface {
	tracks: TrackInterface[];
	listens: number;
	likes: number;
	uploadDate: Date;
}

const PlaylistSchema = new Schema<PlaylistInterface>({});

export default models?.Playlist ||
	model<PlaylistInterface>("Playlist", PlaylistSchema);
