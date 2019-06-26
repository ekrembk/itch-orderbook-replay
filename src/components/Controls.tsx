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
				<div className="controls__skip" onClick={() => setSeconds(seconds - 600)}>&lt;&lt;</div>
				<div className="controls__skip" onClick={() => setSeconds(seconds - 10)}>&lt;</div>
				<div className={playing ? "controls__play controls__play--playing" : "controls__play"} onClick={e => setPlaying(!playing)}><FontAwesomeIcon icon={!playing ? faPlay : faPause} /></div>
				<div className="controls__skip" onClick={() => setSeconds(seconds + 10)}>&gt;</div>
				<div className="controls__skip" onClick={() => setSeconds(seconds + 600)}>&gt;&gt;</div>
			</div>

            <div className="controls__speed">
				{[1,5,10,25,100].map(rate => <div key={rate} className={rate === speed ? "checked": ""} onClick={() => setSpeed(rate)}>{rate}x</div>)}
            </div>
        </div>
    );
}

export default Controls;