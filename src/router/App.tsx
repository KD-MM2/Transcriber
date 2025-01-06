import { type Navigation } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/react-router-dom";

import { Outlet } from "react-router-dom";

import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { paths } from "@/config/paths";

const NAVIGATION: Navigation = [
	{
		title: "Home",
		icon: <HomeIcon />,
	},
	{
		segment: paths.transcripts.path,
		pattern: paths.transcript.pattern,
		title: "Transcripts",
		icon: <SpeakerNotesIcon />,
	},
	{
		segment: paths.uploads.path,
		title: "Uploads",
		icon: <UploadFileIcon />,
	},
	{
		segment: paths.templates.path,
		pattern: paths.template.pattern,
		title: "Templates",
		icon: <ArticleIcon />,
	},
	{
		segment: paths.settings.path,
		title: "Settings",
		icon: <SettingsIcon />,
	},
];

const BRANDING = {
	title: "Transcribidi",
	logo: <img src="/vite.svg" alt="Transcribidi" />,
};

export default function App() {
	return (
		<AppProvider navigation={NAVIGATION} branding={BRANDING}>
			<Outlet />
		</AppProvider>
	);
}
