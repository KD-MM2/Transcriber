import { api } from "@/lib/axios";

export async function getAllTemplates() {
	return api.get("/templates");
}

export async function getTemplate(id: string) {
	return api.get(`/templates/${id}`);
}

export async function createTemplate(data: any) {
	return api.post("/templates", data);
}

export async function updateTemplate(id: string, data: any) {
	return api.put(`/templates/${id}`, data);
}
