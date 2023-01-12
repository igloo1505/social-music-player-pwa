import { useEffect, useState } from "react";
import { AudioLoader } from "three";
import { PositionalAudio, AudioListener } from "three";
import { useThree, RootState, useLoader } from "@react-three/fiber";
import { connect } from "react-redux";
import { RootState as AppRootState } from "../../state/store";
import { audioEnum } from "../../types/AudioHandler";
import AlienInvasionManager from "../../types/AlienInvasionManager";
const connector = connect((state: AppRootState, props) => ({
	muted: state.three.audioMuted,
}));

interface AudioManagerProps {
	muted: boolean;
	manager: AlienInvasionManager;
}

export const AudioManager = connector(
	({ muted, manager }: AudioManagerProps) => {
		const allBufferPaths = Object.values(audioEnum);
		const _allBuffers = useLoader(AudioLoader, allBufferPaths);
		const audioHandler = manager.audio;
		// TODO: Set currentAudioBuffer here after moving functions to class methods

		useEffect(() => {
			if (_allBuffers) {
				audioHandler.setAudioBuffers(_allBuffers);
			}
		}, [_allBuffers]);
		return <group></group>;
	}
);
