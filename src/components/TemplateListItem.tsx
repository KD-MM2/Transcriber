import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { ITemplateListItemProps } from "@/types";

export default function TemplateListItem({ data }: ITemplateListItemProps) {
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
						Created at: {data.createdAt}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">
						<Link to={`/templates/${data.id}`}>View</Link>
					</Button>
				</CardActions>
			</Card>
		</>
	);
}
