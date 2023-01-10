import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../state/store";
import { audioEnum } from "./CuriousSpaceship";
const connector = connect((state: RootState, props) => ({
	audioPath: state.three.currentAudioPath,
}));
interface AudioProps {
	audioPath: audioEnum;
}

const Audio = connector(({ audioPath }: AudioProps) => {
	return (
		<audio
			loop
			id="audio-dom-element"
			preload="auto"
			autoPlay={false}
			style={{
				display: "none",
			}}
		>
			{audioPath && <source src={audioPath} type="audio/mp3" />}
		</audio>
	);
});

export default Audio;
