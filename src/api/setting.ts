import { api } from "@/lib/axios";

export async function getSetting() {
	return api.get("/settings");
}
