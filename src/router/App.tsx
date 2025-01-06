import { type Navigation } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/react-router-dom";

import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

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

const SETUP_ONLY = [
	{
		segment: paths.setup.path,
		title: "Setup",
		icon: <SettingsIcon />,
	},
];

const BRANDING = {
	title: "Transcriber",
	logo: <img src="/vite.svg" alt="Transcriber logo" />,
};

export default function App() {
	const location = useLocation();
	const isSetup = location.pathname.includes(paths.setup.path);
	return (
		<AppProvider
			navigation={isSetup ? SETUP_ONLY : NAVIGATION}
			branding={BRANDING}
		>
			<Outlet />
		</AppProvider>
	);
}
