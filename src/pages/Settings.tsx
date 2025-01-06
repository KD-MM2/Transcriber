import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { IListItem } from "@/types";

const whisperModels: IListItem[] = [
	{ label: "Tiny", value: "tiny" },
	{ label: "Tiny Q5_1", value: "tiny-q5_1" },
	{ label: "Tiny Q8_0", value: "tiny-q8_0" },
	{ label: "Tiny English Only", value: "tiny.en" },
	{ label: "Tiny English Only Q5_1", value: "tiny.en-q5_1" },
	{ label: "Tiny English Only Q8_0", value: "tiny.en-q8_0" },
	{ label: "Base", value: "base" },
	{ label: "Base Q5_1", value: "base-q5_1" },
	{ label: "Base Q8_0", value: "base-q8_0" },
	{ label: "Base English Only", value: "base.en" },
	{ label: "Base English Only Q5_1", value: "base.en-q5_1" },
	{ label: "Base English Only Q8_0", value: "base.en-q8_0" },
	{ label: "Small", value: "small" },
	{ label: "Small Q5_1", value: "small-q5_1" },
	{ label: "Small Q8_0", value: "small-q8_0" },
	{ label: "Small English Only", value: "small.en" },
	{ label: "Small English Only Q5_1", value: "small.en-q5_1" },
	{ label: "Small English Only Q8_0", value: "small.en-q8_0" },
	{ label: "Small English Only tdrz", value: "small.en-tdrz" },
	{ label: "Medium", value: "medium" },
	{ label: "Medium Q5_0", value: "medium-q5_0" },
	{ label: "Medium Q8_0", value: "medium-q8_0" },
	{ label: "Medium English Only", value: "medium.en" },
	{ label: "Medium English Only Q5_0", value: "medium.en-q5_0" },
	{ label: "Medium English Only Q8_0", value: "medium.en-q8_0" },
	{ label: "Large v1", value: "large-v1" },
	{ label: "Large v2", value: "large-v2" },
	{ label: "Large v2 Q5_0", value: "large-v2-q5_0" },
	{ label: "Large v2 Q8_0", value: "large-v2-q8_0" },
	{ label: "Large v3", value: "large-v3" },
	{ label: "Large v3 Q5_0", value: "large-v3-q5_0" },
	{ label: "Large v3 Turbo", value: "large-v3-turbo" },
	{ label: "Large v3 Turbo Q5_0", value: "large-v3-turbo-q5_0" },
	{ label: "Large v3 Turbo Q8_0", value: "large-v3-turbo-q8_0" },
];

const summarizationBackends: IListItem[] = [
	{ label: "OpenAI", value: "openai" },
	{ label: "Self-Hosted", value: "selfhosted" },
];

const summarizationModels: IListItem[] = [
	{ label: "GPT-4", value: "gpt4" },
	{ label: "GPT-4o", value: "gpt4o" },
	{ label: "GPT-4o mini", value: "gpt4o-mini" },
	{ label: "Mistral 7B", value: "mistral-7b" },
];

function ModelSelector() {
	const [model, setModel] = useState<IListItem | undefined>();
	const handleChange = (event: SelectChangeEvent) => {
		setModel(whisperModels.find((m) => m.value === event.target.value));
	};

	return (
		<FormControl className="w-1/4">
			<InputLabel id="whisper-model-select-helper-label">
				Model
			</InputLabel>
			<Select
				labelId="whisper-model-select-helper-label"
				id="whisper-model-select-helper"
				value={model?.value || ""}
				label="Model"
				onChange={handleChange}
			>
				{whisperModels.map((model, index) => (
					<MenuItem
						value={model.value}
						key={`whisper-model-select-${index}`}
					>
						{model.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

function SummarizeAPISelector() {
	const [api, setApi] = useState<IListItem | undefined>();
	const handleChange = (event: SelectChangeEvent) => {
		setApi(
			summarizationBackends.find((m) => m.value === event.target.value)
		);
	};
	return (
		<FormControl className="w-1/4">
			<InputLabel id="summarize-api-select-helper-label">
				Summarize Backend
			</InputLabel>
			<Select
				labelId="summarize-api-select-helper-label"
				id="summarize-api-select-helper"
				label="Summarize API"
				value={api?.value || ""}
				onChange={handleChange}
			>
				{summarizationBackends.map((api, index) => (
					<MenuItem
						value={api.value}
						key={`summarize-api-select-${index}`}
					>
						{api.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

function CardContentWStyles({ children }: { children: React.ReactNode }) {
	return (
		<CardContent className="flex flex-row justify-between w-full items-center">
			{children}
		</CardContent>
	);
}

function SummarizationModelSelector() {
	const [model, setModel] = useState<IListItem | undefined>();
	const handleChange = (event: SelectChangeEvent) => {
		setModel(
			summarizationModels.find((m) => m.value === event.target.value)
		);
	};

	return (
		<FormControl className="w-1/4">
			<InputLabel id="summarization-model-select-helper-label">
				Model
			</InputLabel>
			<Select
				labelId="summarization-model-select-helper-label"
				id="summarization-model-select-helper"
				value={model?.value || ""}
				label="Model"
				onChange={handleChange}
			>
				{summarizationModels.map((model, index) => (
					<MenuItem
						value={model.value}
						key={`summarization-model-select-${index}`}
					>
						{model.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

function Settings() {
	return (
		<div className="flex flex-col gap-4">
			<Card>
				<CardContentWStyles>
					<Typography>Whisper Model</Typography>
					<ModelSelector />
				</CardContentWStyles>
			</Card>

			<Card>
				<CardContentWStyles>
					<Typography>Summarization Backend</Typography>
					<SummarizeAPISelector />
				</CardContentWStyles>
			</Card>
			<Card>
				<CardContentWStyles>
					<Typography>Summarization API</Typography>
					<TextField
						id="outlined-basic"
						label="Summarization API"
						variant="outlined"
						className="w-1/4"
					/>
				</CardContentWStyles>
			</Card>
			<Card>
				<CardContentWStyles>
					<Typography>Summarization API Key</Typography>
					<TextField
						id="outlined-basic"
						label="Summarization API Key"
						variant="outlined"
						className="w-1/4"
					/>
				</CardContentWStyles>
			</Card>
			<Card>
				<CardContentWStyles>
					<Typography>Summarization Model</Typography>
					<SummarizationModelSelector />
				</CardContentWStyles>
			</Card>

			<Card>
				<CardContentWStyles>
					<Typography>Speaker Diarization</Typography>
					<Switch defaultChecked />
				</CardContentWStyles>
			</Card>
		</div>
	);
}

export default Settings;
