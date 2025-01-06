export const paths = {
	root: {
		path: "/",
		getHref: () => "/",
	},
	transcripts: {
		path: "transcripts",
		getHref: () => "/transcripts",
	},
	transcript: {
		path: "transcripts/:transcriptId",
		pattern: "transcripts{/:transcriptId}*",
		getHref: (id: string) => `/transcripts/${id}`,
	},
	upload: {
		path: "upload",
		getHref: () => "/upload",
	},
	templates: {
		path: "templates",
		getHref: () => "/templates",
	},
	template: {
		path: "templates/:templateId",
		pattern: "templates{/:templateId}*",
		getHref: (id: string) => `/templates/${id}`,
	},
	settings: {
		path: "settings",
		getHref: () => "/settings",
	},
	setup: {
		path: "setup",
		getHref: () => "/setup",
	},
} as const;
