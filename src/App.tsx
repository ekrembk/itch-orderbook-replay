import React, { useState } from "react";
import Replay from "./components/Replay";
import Controls from "./components/Controls";
import { formatUnix } from "./lib/time";
import useInterval from "./lib/hooks/useInterval";
import DateSelector from './components/DateSelector';

const dates = [
	'2019-06-25',
	'2019-06-26',
	'2019-07-02',
	'2019-07-03',
	'2019-07-04',
	'2019-07-09',
	'2019-07-10',
	'2019-07-11',
	'2019-07-16',
	'2019-07-17',
	'2019-07-18',
];

const App: React.FC = () => {
	const [date, setDate] = useState('');
	const [seconds, setSeconds] = useState(0);
	const [speed, setSpeed] = useState(1);
	const [playing, setPlaying] = useState(false);

	useInterval(() => setSeconds(seconds + speed / 10), playing ? 100 : 999999999);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-2">
					<h4>Dates</h4>
					<DateSelector date={date} dates={dates} onChange={setDate} />
				</div>

				<div className="col-md-10">
					{date && (
						<div className="row">
							<div className="col-md-6">
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

							<div className="col-md-6">
								<Replay
									seconds={seconds}
									date={date}
									/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
