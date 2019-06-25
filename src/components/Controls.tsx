import React from "react";
import "./controls.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

interface Props {
    seconds: number;
    setSeconds: (seconds: number) => void;
    speed: number;
    setSpeed: (speed: number) => void;
    playing: boolean;
    setPlaying: (seconds: boolean) => void;
}

export const Controls: React.FC<Props> = ({ playing, setPlaying, speed, setSpeed, seconds, setSeconds }) => {
    return (
        <div className="controls">
			<div>
				<a className="controls__skip" onClick={() => setSeconds(seconds - 600)}>&lt;&lt;</a>
				<a className="controls__skip" onClick={() => setSeconds(seconds - 10)}>&lt;</a>
				<a className={playing ? "controls__play controls__play--playing" : "controls__play"} onClick={e => setPlaying(!playing)}><FontAwesomeIcon icon={!playing ? faPlay : faPause} /></a>
				<a className="controls__skip" onClick={() => setSeconds(seconds + 10)}>&gt;</a>
				<a className="controls__skip" onClick={() => setSeconds(seconds + 600)}>&gt;&gt;</a>
			</div>

            <div className="controls__speed">
				{[1,5,10,25,100].map(rate => <a key={rate} className={rate === speed ? "checked": ""} onClick={() => setSpeed(rate)}>{rate}x</a>)}
            </div>
        </div>
    );
}

export default Controls;