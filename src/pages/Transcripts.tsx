"use client";

import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

import TranscriptListItem from "@/components/TranscriptListItem";
import { transcriptions } from "@/dummy";
import { IViewConfig } from "@/types";

const gridViewConfig: IViewConfig = {
	spacing: { xs: 2, md: 3 },
	columns: { xs: 4, sm: 8, md: 12 },
};
const listViewConfig: IViewConfig = {
	spacing: { xs: 2, md: 2 },
	columns: { xs: 1, sm: 1, md: 1 },
};

type View = "list" | "grid";

function Transcripts() {
	const [viewConfig, setViewConfig] = useState<IViewConfig>(listViewConfig);
	const [view, setView] = useState<View>("list");
	const handleViewChange = (
		_event: React.MouseEvent<HTMLElement>,
		nextView: View
	) => {
		setView(nextView);
		setViewConfig(nextView === "list" ? listViewConfig : gridViewConfig);
	};

	return (
		<div className="flex flex-col gap-4">
			<ToggleButtonGroup
				value={view}
				exclusive
				onChange={handleViewChange}
				className="self-end"
			>
				<ToggleButton value="list" aria-label="list">
					<ViewListIcon />
				</ToggleButton>
				<ToggleButton value="grid" aria-label="module">
					<ViewModuleIcon />
				</ToggleButton>
			</ToggleButtonGroup>

			<Box className="flex-grow">
				<TransitionGroup>
					<CSSTransition
						key={viewConfig.columns.md}
						timeout={300}
						classNames="fade"
					>
						<Grid
							container
							spacing={viewConfig.spacing}
							columns={viewConfig.columns}
						>
							{transcriptions.map((item, index) => (
								<Grid
									key={index}
									size={{ xs: 2, sm: 4, md: 4 }}
								>
									<TranscriptListItem data={item} />
								</Grid>
							))}
						</Grid>
					</CSSTransition>
				</TransitionGroup>
			</Box>
		</div>
	);
}

export default Transcripts;
