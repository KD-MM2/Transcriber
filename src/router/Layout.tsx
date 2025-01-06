import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";

import { Outlet } from "react-router-dom";

const Root: React.FC = () => {
	return (
		<DashboardLayout>
			<PageContainer breadcrumbs={[]} title="">
				<Outlet />
			</PageContainer>
		</DashboardLayout>
	);
};

export default Root;
