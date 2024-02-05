import SyncHeader from "../../components/SyncHeader";
import { PageWrapper } from "../../common/PageWrapper";
import Step from "../../components/Step";
import { connectAppProps } from "../../pagesData/connectAppData";

const ConfigSteps: React.FC<connectAppProps> = ({
	appName,
	appLogoPath,
	AppMarketplaceUrl,
	authentication,
}) => {
	return (
		<PageWrapper AppMarketplaceUrl={AppMarketplaceUrl}>
			<SyncHeader appName={appName} appLogoPath={appLogoPath} />
			<Step title={`Set up ${appName}`}>
				<div>{authentication}</div>
			</Step>
		</PageWrapper>
	);
};
export default ConfigSteps;
