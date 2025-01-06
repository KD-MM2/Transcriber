import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Template() {
	const [maxRows, setMaxRows] = useState(20);
	useEffect(() => {
		const handleResize = () => {
			const rowHeight = 40; // Approximate height of a row in pixels
			const screenHeight = window.innerHeight;
			const calculatedMaxRows = Math.floor(screenHeight / rowHeight);
			setMaxRows(calculatedMaxRows);
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // Call initially to set the maxRows based on initial screen height

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return (
		<div className="flex flex-col gap-4">
			<Typography variant="h2">Template</Typography>
			<TextField id="outlined-basic" label="Title" variant="outlined" />
			<TextField
				id="standard-multiline-flexible"
				label="Prompt"
				multiline
				maxRows={maxRows}
				minRows={3}
				variant="outlined"
			/>
		</div>
	);
}

export default Template;
