// import { Button, Card, Checkbox, Flex, List, Steps, Input } from "antd";
import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// import { registerOnMessage } from "@/hooks/useWs";
import { api } from "@/lib/axios";
import NotFound from "@/pages/NotFound";
import { whisperModels } from "@/pages/Settings";

interface StateProps {
	val: any;
	setVal: (v: any) => void;
}
interface StateProps2 {
	val: any;
	setVal: (v: any) => void;
	val2: any;
	setVal2: (v: any) => void;
}

interface CardComponentProps extends StateProps {
	options: any[];
}
interface SummarizeBackend {
	host: string;
	accessToken: string;
}
interface Template {
	name: string;
	prompt: string;
}

interface Model {
	name: string;
	lang: string;
	size: string;
	quant: string;
}

const convert = (l: string[], s: string[], q: string[]) => {
	const valid = whisperModels.map((m) => m.value);

	const models: Model[] = [];

	l.forEach((lang) => {
		s.forEach((size) => {
			q.forEach((quant) => {
				const name = `${size}${lang === "en" ? `.${lang}` : ""}${quant ? `-${quant}` : ""}`;
				const m: Model = { name, lang, size, quant };
				if (valid.includes(name) && !models.includes(m)) {
					models.push(m);
				}
			});
		});
	});
	return models;
};

const CardComponent = ({ options, val, setVal }: CardComponentProps) => (
	<FormGroup
		style={{
			display: "flex",
			flexDirection: "column",
			gap: "1rem",
			userSelect: "none",
		}}
	>
		{options.map((option) => (
			<FormControlLabel
				key={option.value}
				control={
					<Checkbox
						checked={val.includes(option.value)}
						onChange={(event) => {
							const newValue = event.target.checked
								? [...val, option.value]
								: val.filter((v: any) => v !== option.value);
							setVal(newValue);
						}}
					/>
				}
				label={option.label}
			/>
		))}
	</FormGroup>
);

const RemovableList = ({ val, setVal, val2, setVal2 }: StateProps2) => (
	<List>
		{val.map((item: any) => (
			<ListItem
				key={item}
				secondaryAction={
					<>
						<Button
							color="primary"
							variant="text"
							onClick={() => setVal2(item)}
							disabled={val2 === item}
						>
							default
						</Button>
						<Button
							color="error"
							variant="text"
							onClick={() =>
								setVal(val.filter((v: any) => v !== item))
							}
						>
							delete
						</Button>
					</>
				}
			>
				<ListItemText
					primary={
						typeof item === "string" ? (
							item
						) : (
							<strong>{item.name}</strong>
						)
					}
					secondary={typeof item === "string" ? null : item.prompt}
				/>
			</ListItem>
		))}
	</List>
);

const SummarizeModel = ({ val, setVal }: StateProps) => (
	<Box display="flex" flexDirection="column" gap={2} alignItems="flex-start">
		<Typography variant="h4">Supports OpenAI API</Typography>
		<TextField
			label="Host"
			variant="outlined"
			value={val.host || ""}
			onChange={(e: any) => setVal({ ...val, host: e.target.value })}
		/>
		<TextField
			label="Access Token"
			variant="outlined"
			value={val.accessToken || ""}
			onChange={(e: any) =>
				setVal({ ...val, accessToken: e.target.value })
			}
		/>
	</Box>
);

const Templates = ({ val, setVal, val2, setVal2 }: StateProps2) => {
	const [template, setTemplate] = useState<Template>({
		name: "",
		prompt: "",
	});
	return (
		<Box display="flex" gap={2} alignItems="flex-start">
			<Box display="flex" flexDirection="column" gap={1} width="50%">
				<Typography variant="h4">Templates</Typography>
				<TextField
					label="Name"
					value={template.name || ""}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setTemplate({ ...template, name: e.target.value })
					}
					variant="outlined"
				/>
				<TextField
					label="Prompt"
					value={template.prompt || ""}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setTemplate({ ...template, prompt: e.target.value })
					}
					variant="outlined"
				/>
				<Button
					variant="contained"
					onClick={() => {
						setVal([...val, template]);
						setTemplate({ name: "", prompt: "" } as Template);
					}}
				>
					Add
				</Button>
			</Box>

			<Box
				sx={{
					overflowY: "scroll",
					width: "50%",
					minHeight: 350,
					maxHeight: 350,
					overflowWrap: "anywhere",
					textAlign: "left",
				}}
			>
				<RemovableList
					val={val}
					setVal={setVal}
					val2={val2}
					setVal2={setVal2}
				/>
			</Box>
		</Box>
	);
};

const FinishScreen = ({ val, setVal: _setVal }: StateProps) => {
	return (
		<>
			<Card
				sx={{
					height: "100%",
					minHeight: 350,
					maxHeight: 350,
					overflowY: "auto",
					textAlign: "left",
				}}
			>
				<CardContent>
					<List>
						{val.map((item: any, index: number) => (
							<ListItem key={index}>
								<Typography style={{ whiteSpace: "pre-wrap" }}>
									{item}
								</Typography>
							</ListItem>
						))}
					</List>
				</CardContent>
			</Card>
		</>
	);
};

function Setup() {
	const [currentStep, setCurrentStep] = useState(0);
	const [models, setModels] = useState<Model[]>([]);
	const [selectedLang, setSelectedLang] = useState<string[]>([]);
	const [selectedSize, setSelectedSize] = useState<string[]>([]);
	const [selectedQuant, setSelectedQuant] = useState<string[]>([]);
	const [selectedBackend, setSelectedBackend] = useState<SummarizeBackend>({
		host: "",
		accessToken: "",
	});
	const [templates, setTemplates] = useState<Template[]>([]);
	const [backendLogs, setBackendLogs] = useState<string[]>([]);
	const [defaultModel, setDefaultModel] = useState<string>("");
	const [defaultTemplate, setDefaultTemplate] = useState<Template>(
		{} as Template
	);

	// const handleMessage = useCallback(
	// 	(message: any) => {
	// 		// console.log("handleMessage:", message);
	// 		setBackendLogs((prev) => [message, ...prev]);
	// 	},
	// 	[setBackendLogs]
	// );

	const options = {
		lang: [
			{ label: "English", value: "en" },
			{ label: "Multilingual", value: "multilingual" },
		],
		sizes: [
			{ label: "Tiny", value: "tiny" },
			{ label: "Base", value: "base" },
			{ label: "Small", value: "small" },
			{ label: "Medium", value: "medium" },
			{ label: "Large v1", value: "large-v1" },
			{ label: "Large v2", value: "large-v2" },
			{ label: "Large v3", value: "large-v3" },
			{ label: "Large v3 Turbo", value: "large-v3-turbo" },
		],
		quant: [
			{ label: "Non-quantized", value: "" },
			{ label: "5-bit", value: "q5_0" },
			{ label: "5-bit (1 bit for activations)", value: "q5_1" },
			{ label: "8-bit", value: "q8_0" },
			{ label: "tdrz", value: "tdrz" },
		],
	};

	const getCurrentStepComponent = (currentStep: number) => {
		switch (currentStep) {
			case 0:
				return (
					<CardComponent
						options={options.lang}
						val={selectedLang}
						setVal={setSelectedLang}
					/>
				);
			case 1:
				return (
					<CardComponent
						options={options.sizes}
						val={selectedSize}
						setVal={setSelectedSize}
					/>
				);
			case 2:
				return (
					<CardComponent
						options={options.quant}
						val={selectedQuant}
						setVal={setSelectedQuant}
					/>
				);
			case 3:
				return (
					<RemovableList
						val={models}
						setVal={setModels}
						val2={defaultModel}
						setVal2={setDefaultModel}
					/>
				);
			case 4:
				return (
					<SummarizeModel
						val={selectedBackend}
						setVal={setSelectedBackend}
					/>
				);
			case 5:
				return (
					<Templates
						val={templates}
						setVal={setTemplates}
						val2={defaultTemplate}
						setVal2={setDefaultTemplate}
					/>
				);
			case 6:
				return (
					<FinishScreen val={backendLogs} setVal={setBackendLogs} />
				);
			default:
				return <NotFound />;
		}
	};

	const finishHandler = (
		models: Model[],
		defaultModel: string,
		summarizeBackend: SummarizeBackend,
		templates: Template[],
		defaultTemplate: Template
	) => {
		console.log("FINISHING Models:", models);
		console.log("FINISHING API:", summarizeBackend);
		console.log("FINISHING Templates:", templates);
		try {
			// registerOnMessage(handleMessage);
			const res = api.post("/api/setup", {
				models,
				defaultModel,
				summarizeBackend,
				templates,
				defaultTemplate,
			});
			console.log("FINISHING RESPONSE:", res);
		} catch (e) {
			console.log("FINISHING ERROR:", e);
		}
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			gap={2}
			alignItems="flex-start"
		>
			<Card sx={{ minWidth: 1000, maxWidth: 1000 }}>
				<Stepper activeStep={currentStep} alternativeLabel>
					{[
						"Language",
						"Model size",
						"Quantization",
						"Preview Models",
						"Summarizer",
						"Templates",
						"Finish",
					].map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			</Card>

			<Card
				sx={{
					height: "100%",
					minHeight: 400,
					maxHeight: 400,
					minWidth: 1000,
					maxWidth: 1000,
					overflowY: "auto",
				}}
			>
				{getCurrentStepComponent(currentStep)}
			</Card>

			<Card
				sx={{
					minWidth: 1000,
					maxWidth: 1000,
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
					gap: "1rem",
				}}
			>
				<Button
					onClick={() => setCurrentStep(Math.max(currentStep - 1, 0))}
					disabled={currentStep === 0}
				>
					Back
				</Button>
				<Button
					disabled={
						(selectedLang.length === 0 && currentStep === 0) ||
						(selectedSize.length === 0 && currentStep === 1) ||
						(selectedQuant.length === 0 && currentStep === 2) ||
						(defaultModel === "" && currentStep === 3)
					}
					onClick={() => {
						if (currentStep === 0 && selectedLang.length === 0) {
							console.log("Please select a language");
							return;
						}

						if (currentStep === 2) {
							setModels(
								convert(
									selectedLang,
									selectedSize,
									selectedQuant
								)
							);
						}

						if (currentStep === 5) {
							finishHandler(
								models,
								defaultModel,
								selectedBackend,
								templates,
								defaultTemplate
							);
						}

						if (currentStep === 6) {
							window.location.href = "/";
						}
						setCurrentStep(Math.min(currentStep + 1, 6));
					}}
				>
					{currentStep >= 6 ? "Finish" : "Next"}
				</Button>
			</Card>
		</Box>
	);
}

export default Setup;
