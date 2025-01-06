import { useLocation } from "react-router-dom";

function Transcript() {
	const location = useLocation();

	return (
		<div>
			<h1>Transcripts</h1>
			<p>Current URL: {location.pathname}</p>
		</div>
	);
}

export default Transcript;
