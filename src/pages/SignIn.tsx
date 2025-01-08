"use client";

import type { Session } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";

import { useNavigate } from "react-router-dom";

import { useSession } from "@/hooks/SessionContext";

const fakeAsyncGetSession = async (formData: any): Promise<Session> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (formData.get("password") === "password") {
				resolve({
					user: {
						name: "KD-MM2",
						email: formData.get("email") || "",
						image: "https://avatars.githubusercontent.com/u/57068549",
					},
				});
			}
			reject(new Error("Incorrect credentials."));
		}, 1000);
	});
};

function SignIn() {
	const { setSession } = useSession();
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-center h-screen absolute inset-0">
			<SignInPage
				providers={[{ id: "credentials", name: "Credentials" }]}
				signIn={async (provider, formData, callbackUrl) => {
					// Demo session
					try {
						const session = await fakeAsyncGetSession(formData);
						if (session) {
							setSession(session);
							navigate(callbackUrl || "/", { replace: true });
							return {};
						}
					} catch (error) {
						return {
							error:
								error instanceof Error
									? error.message
									: "An error occurred",
						};
					}
					return {};
				}}
			/>
		</div>
	);
}

export default SignIn;
