import { api } from "@/lib/axios";

export async function getTranscriptList() {
	return api.get("/transcripts");
}

export async function getTranscript(id: string) {
	return api.get(`/transcripts/${id}`);
}
