import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { ITranscriptProps } from "@/types";

export default function TranscriptListItem({ data }: ITranscriptProps) {
	return (
		<>
			<Card className="min-w-64">
				<CardContent>
					<Typography
						gutterBottom
						sx={{ color: "text.secondary" }}
						className="text-sm"
					>
						{data.id}
					</Typography>
					<Typography variant="h5" component="div">
						{data.title}
					</Typography>
					<Typography
						sx={{ color: "text.secondary" }}
						className="mb-6"
					>
						{data.duration}
					</Typography>
					<Typography variant="body2">
						Created at: {data.createdAt}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">
						<Link to={`/transcripts/${data.id}`}>View</Link>
					</Button>
				</CardActions>
			</Card>
		</>
	);
}
