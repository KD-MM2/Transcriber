"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useColorScheme } from "@mui/material/styles";

import { paths } from "@/config/paths";

const NotFound = () => {
	const { setMode } = useColorScheme();

	useEffect(() => {
		setMode("system");
	}, [setMode]);

	return (
		<div
			className="flex items-center justify-center h-screen w-screen 
			dark:bg-gray-900 bg-white 
			dark:text-white text-black 
			transition-colors duration-300"
		>
			<div className="flex flex-col items-center font-semibold text-center">
				<h1
					className="text-4xl mb-4 
					dark:text-gray-200 text-gray-800"
				>
					404 Not Found
				</h1>
				<p
					className="mb-4 
					dark:text-gray-300 text-gray-600"
				>
					Sorry, the page you are looking for does not exist.
				</p>
				<Link
					to={paths.root.getHref()}
					replace
					className="
						text-blue-600 dark:text-blue-400 
						hover:underline
						transition-colors duration-300"
				>
					Go to Home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
