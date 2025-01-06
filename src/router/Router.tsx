import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { paths } from "@/config/paths";
import NotFound from "@/pages/NotFound";

const routes = [
	{
		path: paths.root.path,
		lazy: async () => {
			const { default: App } = await import("@/router/App");
			return { Component: App };
		},
		errorElement: <NotFound />,
		children: [
			{
				path: paths.root.path,
				lazy: async () => {
					const { default: Root } = await import("@/router/Layout");
					return { Component: Root };
				},
				errorElement: <NotFound />,
				hydrateFallbackElement: <div>Loading...</div>,
				children: [
					{
						path: paths.root.path,
						lazy: async () => {
							const { default: Landing } = await import(
								"@/pages/Landing"
							);
							return { Component: Landing };
						},
					},
					{
						path: paths.transcripts.path,
						lazy: async () => {
							const { default: Transcripts } = await import(
								"@/pages/Transcripts"
							);
							return { Component: Transcripts };
						},
					},
					{
						path: paths.transcript.path,
						lazy: async () => {
							const { default: Transcript } = await import(
								"@/pages/Transcript"
							);
							return { Component: Transcript };
						},
					},
					{
						path: paths.upload.path,
						lazy: async () => {
							const { default: Upload } = await import(
								"@/pages/Upload"
							);
							return { Component: Upload };
						},
					},
					{
						path: paths.templates.path,
						lazy: async () => {
							const { default: Templates } = await import(
								"@/pages/Templates"
							);
							return { Component: Templates };
						},
					},
					{
						path: paths.template.path,
						lazy: async () => {
							const { default: Template } = await import(
								"@/pages/Template"
							);
							return { Component: Template };
						},
					},
					{
						path: paths.settings.path,
						lazy: async () => {
							const { default: Settings } = await import(
								"@/pages/Settings"
							);
							return { Component: Settings };
						},
					},
					{
						path: paths.setup.path,
						lazy: async () => {
							const { default: Setup } = await import(
								"@/pages/Setup"
							);
							return { Component: Setup };
						},
					},
				],
			},
		],
	},
];

const v7_future = {
	future: {
		v7_relativeSplatPath: true,
		v7_startTransition: true,
		v7_fetcherPersist: true,
		v7_normalizeFormMethod: true,
		v7_partialHydration: true,
		v7_skipActionErrorRevalidation: true,
	},
};

const router = createBrowserRouter(routes, v7_future);

const Router: React.FC = () => (
	<RouterProvider
		router={router}
		future={{ v7_startTransition: v7_future.future.v7_startTransition }}
	/>
);

export default Router;
