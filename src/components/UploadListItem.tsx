import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import LinearProgressWithLabel from "@/components/LinearProgressWithLabel";
import { IUploadListItemProps } from "@/types";

export default function UploadListItem({ data }: IUploadListItemProps) {
	const [prg, setPrg] = useState(data.progress);
	useEffect(() => {
		const timer = setInterval(() => {
			setPrg((prevProgress) =>
				prevProgress >= 100 ? 10 : prevProgress + 10
			);
		}, 800);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<>
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography
						gutterBottom
						sx={{ color: "text.secondary", fontSize: 14 }}
					>
						{data.id}
					</Typography>
					<Typography variant="h5" component="div">
						{data.title}
					</Typography>
					<Typography sx={{ color: "text.secondary", mb: 1.5 }}>
						{/* TODO: Add Status handler(eg: error->red, success->green, uploading->cancel, cancelled, error,...)*/}
						Status: {data.status}
					</Typography>
					<Typography variant="body2">
						Uploaded at: {data.uploadedAt}
					</Typography>
					<Typography variant="body2">
						Processed at: {data.proccessedAt}
					</Typography>
					<LinearProgressWithLabel value={prg} />
				</CardContent>
			</Card>
		</>
	);
}
