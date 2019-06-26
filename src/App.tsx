import React, { useState } from "react";
import Replay from "./components/Replay";
import Controls from "./components/Controls";
import { formatUnix } from "./lib/time";
import useInterval from "./lib/hooks/useInterval";

const date = "2019-06-25";

const App: React.FC = () => {
	const [seconds, setSeconds] = useState(0);
	const [speed, setSpeed] = useState(1);
	const [playing, setPlaying] = useState(false);

	useInterval(() => setSeconds(seconds + speed / 10), playing ? 100 : 999999999);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-4">
					<div className="mt-1 mb-1">&lt;{formatUnix(seconds)}&gt;</div>
					
					<div className="clearfix mb-3">
						<Controls
							speed={speed}
							setSpeed={setSpeed}
							playing={playing}
							setPlaying={setPlaying}
							seconds={seconds}
							setSeconds={setSeconds}
							/>
					</div>
				</div>

				<div className="col-md-4">
					<Replay
						seconds={seconds}
						date={date}
						/>
				</div>
			</div>
		</div>
	);
};

export default App;