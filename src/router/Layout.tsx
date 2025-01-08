"use client";

import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";

import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useSession } from "@/hooks/SessionContext";

const Root: React.FC = () => {
	const { session } = useSession();
	const location = useLocation();

	if (!session) {
		// Add the `callbackUrl` search parameter
		const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;

		return <Navigate to={redirectTo} replace />;
	}

	return (
		<DashboardLayout>
			<PageContainer breadcrumbs={[]} title="">
				<Outlet />
			</PageContainer>
		</DashboardLayout>
	);
};

export default Root;
