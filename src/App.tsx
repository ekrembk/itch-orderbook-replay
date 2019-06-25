import React, { useState } from "react";
import Replay from "./components/Replay";
import Controls from "./components/Controls";
import { formatUnix } from "./lib/time";
import useSource from "./lib/hooks/useSource";
import useInterval from "./lib/hooks/useInterval";

const date = "2019-06-24";

const App: React.FC = () => {
	const [code, setCode] = useState("ASELS");
	const [codeInput, setCodeInput] = useState(code);
	const [seconds, setSeconds] = useState(0);
	const [speed, setSpeed] = useState("1");
	const [playing, setPlaying] = useState(false);
	const itchSource = useSource("http://replay.fintables.com/data/" + date + "/" + code + "/itch.json", {}, true); 
	const transactionData = useSource("http://replay.fintables.com/data/" + date + "/" + code + "/transactions.json", {}, false); 

	useInterval(() => setSeconds(seconds + parseFloat(speed) / 10), playing ? 100 : 999999999);

	if (!itchSource.response || !transactionData) return <div>Loading...</div>;

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-4 offset-md-4">
					<div className="orderbook__title">
						<input value={codeInput} onChange={e => setCodeInput(e.target.value)} />
						<button onClick={() => setCode(codeInput)}>Change</button>
						{code}&lt;{formatUnix(seconds)}&gt;
					</div>
					
					<Replay
						seconds={seconds}
						source={itchSource.response}
						transactionData={transactionData}
						/>
						
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
		</div>
	);
};

export default App;