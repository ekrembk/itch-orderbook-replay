import React from "react";

interface Props {
    seconds: number;
    setSeconds: (seconds: number) => void;
    speed: string;
    setSpeed: (speed: string) => void;
    playing: boolean;
    setPlaying: (seconds: boolean) => void;
}

export const Controls: React.FC<Props> = ({ playing, setPlaying, speed, setSpeed, seconds, setSeconds }) => {
    return (
        <div className="controls">
            <label><input type="checkbox" checked={playing} onChange={e => setPlaying(!playing)} /> <strong>Oynat</strong></label>

          <br /><br />
          <strong>Hız</strong>
          <select value={speed} onChange={event => setSpeed(event.target.value)}>
            <option value={1}>1x</option>
            <option value={5}>5x</option>
            <option value={10}>10x</option>
            <option value={25}>25x</option>
            <option value={100}>100x</option>
            <option value={250}>250x</option>
          </select>

          <br /><br />

          <strong>İleri sar</strong>
          <br />
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds + 1)}>&gt; 1s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds + 10)}>&gt; 10s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds + 20)}>&gt; 20s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds + 3600)}>&gt; 1h</button>
          </div>

          <br />

          <strong>Geri al</strong>
          <br />
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds - 1)}>&lt; 1s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds - 10)}>&lt; 10s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds - 20)}>&lt; 20s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds - 3600)}>&lt; 1h</button>
          </div>
        </div>
    );
}

export default Controls;