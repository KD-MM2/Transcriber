import Box from "@mui/material/Box";
import LinearProgress, {
	LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

function LinearProgressWithLabel(
	props: LinearProgressProps & { value: number }
) {
	return (
		<Box className="flex items-center">
			<Box className="w-full mr-4">
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box className="min-w-8">
				<Typography
					variant="body2"
					sx={{ color: "text.secondary" }}
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

export default LinearProgressWithLabel;
