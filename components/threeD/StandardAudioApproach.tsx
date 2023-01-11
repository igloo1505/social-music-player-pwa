import { useEffect, useState } from "react";
import { AudioLoader } from "three";
import { PositionalAudio, AudioListener } from "three";
import { useThree, RootState, useLoader } from "@react-three/fiber";
import { connect } from "react-redux";
import { RootState as AppRootState } from "../../state/store";
import Position from "../../types/Position";
import { audioEnum } from "../../types/AudioHandler";
import AlienInvasionManager from "../../types/AlienInvasionManager";
const connector = connect((state: AppRootState, props) => ({
	muted: state.three.audioMuted,
}));

interface AudioManagerProps {
	muted: boolean;
	currentPosition: Position;
	currentAudioBuffer: audioEnum;
	setBuffer: (bufferKey: audioEnum) => void;
	manager: AlienInvasionManager;
}

export const AudioManager = connector(
	({
		muted,
		currentPosition,
		currentAudioBuffer,
		setBuffer,
		manager,
	}: AudioManagerProps) => {
		const three = useThree();
		const allBufferPaths = Object.values(audioEnum);
		const _allBuffers = useLoader(AudioLoader, allBufferPaths);
		const audioHandler = manager.audio;
		// TODO: Set currentAudioBuffer here after moving functions to class methods
		// useEffect(() => {
		// 	// audioHandler.setAudioShouldPlay(
		// 	// 	!muted,
		// 	// 	three,
		// 	// 	currentAudioBuffer,
		// 	// 	previousAudioBufferKey
		// 	// );
		// 	// !audioHandler.isInitialBuffer &&
		// 	// 	setPreviousAudioBufferKey(currentAudioBuffer);
		// }, [currentAudioBuffer, muted, shouldLoop]);
		useEffect(() => {
			if (currentPosition.stay) return;
			// RESUME Move this logic into main handler class in the AM
			const totalPeriod = currentPosition.getTotalPeriod();
			const periods = {
				...(currentPosition.audioProps?.preExitAudioPath &&
					currentPosition.audioProps?.preExitPeriod && {
						preExit: currentPosition.audioProps?.exitAudioPeriod
							? totalPeriod -
							  currentPosition.audioProps?.preExitPeriod -
							  currentPosition.audioProps.exitAudioPeriod
							: totalPeriod - currentPosition.audioProps?.preExitPeriod,
					}),
				...(currentPosition.audioProps?.exitAudioPath &&
					currentPosition.audioProps?.exitAudioPeriod && {
						exit: totalPeriod - currentPosition.audioProps?.exitAudioPeriod,
					}),
			};
			if (currentPosition.audioProps?.entranceAudioPath) {
				// setTimeout(() => {
				// 	// setBuffer(position.audioProps?.mainAudioPath!);
				// }, periods.entrance);
				setBuffer(currentPosition.audioProps?.entranceAudioPath!);
			}
			if (periods.preExit) {
				setTimeout(() => {
					setBuffer(currentPosition.audioProps?.preExitAudioPath!);
				}, periods.preExit as number);
			}
			if (periods.exit) {
				setTimeout(() => {
					setBuffer(currentPosition.audioProps?.exitAudioPath!);
				}, periods.exit);
			}
			if (currentPosition.audioProps?.mainAudioPath) {
				setTimeout(() => {
					setBuffer(currentPosition.audioProps?.mainAudioPath!);
				}, currentPosition.audioProps.entranceAudioPeriod || 0);
			}
		}, [currentPosition]);
		useEffect(() => {
			if (_allBuffers) {
				audioHandler.setAudioBuffers(_allBuffers, three);
			}
		}, [_allBuffers]);
		// useEffect(() => {
		// 	if (allBuffers) {
		// 		console.log("initializing audio");
		// 		audioHandler.initAudio(three, allBuffers);
		// 	}
		// }, [allBuffers]);
		return <group></group>;
	}
);
