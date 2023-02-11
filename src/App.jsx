import { OrganizationalStructureProvider } from '$components/OrganizationalStructureChart/contexts/OrganizationalStructureContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DragSortingProvider } from '$contexts/DragSortingContext';
import { ValuesChainProvider } from '$contexts/ValuesChainContext';
import { SellCRMContextProvider } from '$contexts/SellCrmContext';
import { FullscreenProvider } from '$contexts/FullscreenContext';
import { HeaderTopProvider } from '$contexts/HeaderTopContext';
import { DrawerProvider } from '$contexts/DrawerContext';
import { ModalProvider } from '$contexts/ModalContext';
import { SiderProvider } from '$contexts/SiderContext';
import { StepsProvider } from '$contexts/StepsContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRoutes } from 'react-router-dom';
import { getTimeBySecondAgo } from '$utils';
import GetRoutesByRole from './routes';
import '@biso24/shared/styles';
import '$styles/global.scss';
import '$theme/theme.less';

const staleTime = 20000; // mill

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime,
			initialDataUpdatedAt: getTimeBySecondAgo(staleTime / 1000)
		}
	}
});

const App = () => {
	const routing = useRoutes(GetRoutesByRole());

	return (
		<QueryClientProvider client={queryClient}>
			{/* // move from OrganizationalStructure, refactor late */}
			<FullscreenProvider>
				<ValuesChainProvider>
					{/* -------------------- */}
					<OrganizationalStructureProvider>
						<DragSortingProvider>
							<StepsProvider>
								<HeaderTopProvider>
									<SiderProvider>
										<ModalProvider>
											<SellCRMContextProvider>
												<ToastContainer draggable={false} autoClose={3000} />
												<DrawerProvider>{routing}</DrawerProvider>
											</SellCRMContextProvider>
										</ModalProvider>
									</SiderProvider>
								</HeaderTopProvider>
							</StepsProvider>
						</DragSortingProvider>
					</OrganizationalStructureProvider>
				</ValuesChainProvider>
			</FullscreenProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};

export default App;
