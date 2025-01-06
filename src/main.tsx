import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import CssBaseline from "@mui/material/CssBaseline";

import "@/index.css";
import Router from "@/router/Router";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<CssBaseline />
		<Router />
	</StrictMode>
);
