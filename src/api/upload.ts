import { api } from "@/lib/axios";

export async function uploadFile(data: any) {
	return api.post("/upload", data);
}
