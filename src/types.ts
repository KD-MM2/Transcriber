export interface IWrapperProps {
	children: React.ReactNode;
}

export interface ITranscription {
	// this types is used in the TranscriptListItem component
	id: string;
	title: string;
	duration: string;
	audioUrl: string;
	transcriptionId: string;
	waveformId: string;
	createdAt: string;
}

export interface IAudioWaveform {
	// this types is used in the AudioWaveform component
	version: number;
	channels: number;
	sampleRate: number;
	samplesPerPixel: number;
	bits: number;
	length: number;
	data: number[];
}

export interface ITranscriptionItem {
	// this types is used in the Transcript(page) component
	systemInfo: string;
	model: IModel;
	params: IParams;
	result: IResult;
	transcription: ITranscriptionData[];
	diarization: boolean;
}

interface IModel {
	type: string;
	multilingual: boolean;
	vocab: number;
	audio: IComponent;
	text: IComponent;
	mels: number;
	ftype: number;
}

interface IComponent {
	ctx: number;
	state: number;
	head: number;
	layer: number;
}

interface IParams {
	model: string;
	language: string;
	translate: boolean;
}

interface IResult {
	language: string;
}

interface ITranscriptionData {
	timestamps: ITimestamps;
	// offsets: IOffsets;
	text: string;
	speaker: string;
}

interface ITimestamps {
	from: string;
	to: string;
}

// interface IOffsets {
// 	from: number;
// 	to: number;
// }

export interface ITranscriptProps {
	data: ITranscription;
}

export interface IViewConfig {
	spacing: { xs: number; md: number };
	columns: { xs: number; sm: number; md: number };
}

export interface IUploadItem {
	id: string;
	name: string;
	status: TUploadNProcessStatus;
	progress: number;
	uploadedAt: string;
	proccessedAt: string;
}

export interface IUploadListItemProps {
    data: IUploadItem;
}

export type TUploadNProcessStatus =
	| "success"
	| "error"
	| "uploading"
	| "queued"
	| "processing"
	| "done";
