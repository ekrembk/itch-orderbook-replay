import React from "react";
import "./controls.css";

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
            <a className="controls__skip" onClick={() => setSeconds(seconds - 600)}>&lt;&lt;</a>
            <a className="controls__skip" onClick={() => setSeconds(seconds - 10)}>&lt;</a>
            <a className="controls__play" onClick={e => setPlaying(!playing)}>{!playing ? "PLAY" : "PAUSE"}</a>
            <a className="controls__skip" onClick={() => setSeconds(seconds + 10)}>&gt;</a>
            <a className="controls__skip" onClick={() => setSeconds(seconds + 600)}>&gt;&gt;</a>

            <div className="controls__speed">
				{[1,5,10,25,100].map(rate => <a key={rate} className={rate === speed ? "checked": ""} onClick={() => setSpeed(rate)}>{rate}x</a>)}
            </div>
        </div>
    );
}

export default Controls;