import FuncAndTaskTable from '$pages/OrganizationalStructure/components/OrganizeCompany/components/FuncAndTaskTable';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useInitialPlan from '$hooks/useInitialPlan';
import excludedAuth from '$hocs/excludedAuth';
import withLazyLoad from '$hocs/withLazyLoad';
import { lazy, useLayoutEffect } from 'react';
import SalesNew from '$pages/tandm/SalesNew';
import ComingSoon from '$pages/ComingSoon';
import Route from '$constants/Route';

const Admin = withLazyLoad(lazy(() => import('./pages/Admin')));
const HomePage = withLazyLoad(lazy(() => import('./pages/Home')));

const Login = excludedAuth(withLazyLoad(lazy(() => import('./pages/Login'))));
const Register = excludedAuth(withLazyLoad(lazy(() => import('./pages/Register'))));

const Role = withLazyLoad(lazy(() => import('./pages/Role')));
const NotFound = withLazyLoad(lazy(() => import('./pages/NotFound')));
const InitialPlan = withLazyLoad(lazy(() => import('./pages/InitialPlan/initialPlanTemp')));
const ProductList = withLazyLoad(lazy(() => import('./pages/ProductList')));
const ListAccount = withLazyLoad(lazy(() => import('./pages/ListAccount')));
const PartnerListpage = withLazyLoad(lazy(() => import('./pages/PartnerList')));
const InitialCompany = withLazyLoad(lazy(() => import('./pages/InitialCompany')));
const Authentication = withLazyLoad(lazy(() => import('./pages/Authentication')));
const PersonnelPlanning = withLazyLoad(lazy(() => import('./pages/PersonnelPlanning')));
const AdministrationList = withLazyLoad(lazy(() => import('./pages/AdministrationList')));
const OrganizationalStructure = withLazyLoad(lazy(() => import('./pages/OrganizationalStructure')));

const adminRoutes = [];

const routes = [
	{
		path: Route.Homepage,
		element: <HomePage />,
		children: [
			{
				index: true,
				element: <InitialCompany />
			},
			{
				path: Route.OrganizationalStructure,
				element: <OrganizationalStructure />
			},

			{
				path: Route.BalancedScorecard,
				element: <OrganizationalStructure />
			},
			{
				path: Route.FinancialForecast,
				element: <OrganizationalStructure />
			},
			{
				path: Route.BusinessFinance,
				element: <OrganizationalStructure />
			},
			{
				path: Route.InitialPlan,
				element: <InitialPlan />
			},

			{
				path: Route.RecruitmentProcess,
				element: <h1>RecruitmentProcess</h1>
			},
			{
				path: Route.SalaryStructure,
				element: <h1>SalaryStructure</h1>
			},
			{
				path: Route.Sider.BonusSalary,
				element: <h1>BonusSalary</h1>
			},
			{
				path: Route.Sider.BonusSalaryCalc,
				element: <h1>BonusSalaryCalc</h1>
			},
			{
				path: Route.CompanyPlans,
				element: <h1>CompanyPlans</h1>
			},
			{
				path: Route.ObjectItem,
				element: <PartnerListpage />
			},
			{
				path: Route.MyJob,
				element: <h1>MyJob</h1>
			},
			{
				path: Route.PieceworkPayment,
				element: <h1>PieceworkPayment</h1>
			},
			{
				path: Route.RecruitmentActivities,
				element: <h1>RecruitmentActivities</h1>
			},
			{
				path: Route.LaborManagement,
				element: <h1>LaborManagement</h1>
			},
			{
				path: Route.PersonnelPlanning,
				element: <PersonnelPlanning />
			},
			{
				path: Route.LaborManagement,
				element: <h1>LaborManagement</h1>
			},
			{
				path: Route.RecruitmentPlan,
				element: <h1>RecruitmentPlan</h1>
			},
			{
				path: Route.NamVinh,
				element: <FuncAndTaskTable />
			},
			{
				path: Route.Tandm,
				element: <SalesNew />
			},
			{
				path: Route.comingSoon,
				element: <ComingSoon />
			},
			{
				path: Route.AdministrationList,
				element: <AdministrationList />
			},
			{
				path: Route.ProductList,
				element: <ProductList />
			},

			{
				path: Route.NotFound,
				element: <NotFound />
			}
		]
	},

	{
		path: Route.AdminLayout,
		element: <Admin />,
		children: [
			{
				path: Route.Sider.Authentication,
				element: <Authentication />
			},
			{
				path: Route.Sider.Role,
				element: <Role />
			},
			{
				path: Route.Sider.AccountList,
				element: <ListAccount />
			}
		]
	},

	{
		path: Route.HCM,
		element: <h1>HCM Module</h1>
	},
	{
		path: Route.Sales,
		element: <h1>Sales Module</h1>
	},
	{
		path: Route.Purchase,
		element: <h1>Purchase Module</h1>
	},
	{
		path: Route.Incom,
		element: <h1>Incom Module</h1>
	},
	{
		path: Route.Finance,
		element: <h1>Finance Module</h1>
	},

	{
		path: Route.NotFound,
		element: <NotFound />
	},

	{
		path: Route.Login,
		element: <Login />
	},
	{
		path: Route.Register,
		element: <Register />
	},

	{
		path: Route.All,
		element: <Navigate to={Route.NotFound} />
	},
	{
		path: Route.Empty,
		element: <Navigate to={Route.Homepage} />
	}
];

const GetRoutesByRole = role => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { syncMethod, syncDetail, isLoading } = useInitialPlan();

	useLayoutEffect(() => {
		if (
			!isLoading &&
			!syncMethod &&
			!syncDetail &&
			(pathname === `/core/${Route.BalancedScorecard}` ||
				pathname === `/core/${Route.FinancialForecast}` ||
				pathname === `/core/${Route.BusinessFinance}`)
		) {
			navigate(`/core/${Route.InitialPlan}`);
		}
	}, [isLoading, navigate, pathname, syncDetail, syncMethod]);

	switch (role) {
		case 'Admin':
			return [...adminRoutes, ...routes];

		default:
			return routes;
	}
};

export default GetRoutesByRole;
