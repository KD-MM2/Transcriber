"use client";

import type { Navigation, Session } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { AppProvider } from "@toolpad/core/react-router-dom";

import { useCallback, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { paths } from "@/config/paths";
import { SessionContext } from "@/hooks/SessionContext";

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
	const [session, setSession] = useState<Session | null>(null);
	const location = useLocation();
	const navigate = useNavigate();
	const isSetup = location.pathname === paths.setup.getHref();

	const signIn = useCallback(() => {
		navigate("/sign-in");
	}, [navigate]);

	const signOut = useCallback(() => {
		setSession(null);
		navigate("/sign-in");
	}, [navigate]);

	const sessionContextValue = useMemo(
		() => ({ session, setSession }),
		[session, setSession]
	);

	return (
		<SessionContext.Provider value={sessionContextValue}>
			<AppProvider
				navigation={isSetup ? SETUP_ONLY : NAVIGATION}
				branding={BRANDING}
				session={session}
				authentication={{ signIn, signOut }}
			>
				<Outlet />
			</AppProvider>
		</SessionContext.Provider>
	);
}
