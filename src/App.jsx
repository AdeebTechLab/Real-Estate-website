import React, { useEffect, useMemo } from 'react';
import { RouterProvider, usePathname, useRouter } from './lib/next/navigation.jsx';
import RootLayout from './app/layout.jsx';

import HomePage from './app/page.jsx';
import PropertiesPage from './app/properties/page.jsx';
import PropertyDetailPage from './app/properties/[id]/page.jsx';
import BuyPage from './app/buy/page.jsx';
import RentPage from './app/rent/page.jsx';
import CategoriesPage from './app/categories/page.jsx';
import AgentsPage from './app/agents/page.jsx';
import AgentProfilePage from './app/agents/[id]/page.jsx';
import FavoritesPage from './app/favorites/page.jsx';
import SubmitPropertyPage from './app/submit-property/page.jsx';
import AboutPage from './app/about/page.jsx';
import ContactPage from './app/contact/page.jsx';
import LoginPage from './app/login/page.jsx';
import RegisterPage from './app/register/page.jsx';
import ProfilePage from './app/profile/page.jsx';
import NotFound from './app/not-found.jsx';

function RouteDispatcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Match route and extract params
  const { Component, params } = useMemo(() => {
    // Exact routes
    if (pathname === '/') return { Component: HomePage, params: {} };
    if (pathname === '/properties') return { Component: PropertiesPage, params: {} };
    if (pathname === '/buy') return { Component: BuyPage, params: {} };
    if (pathname === '/rent') return { Component: RentPage, params: {} };
    if (pathname === '/categories') return { Component: CategoriesPage, params: {} };
    if (pathname === '/agents') return { Component: AgentsPage, params: {} };
    if (pathname === '/favorites') return { Component: FavoritesPage, params: {} };
    if (pathname === '/submit-property') return { Component: SubmitPropertyPage, params: {} };
    if (pathname === '/about') return { Component: AboutPage, params: {} };
    if (pathname === '/contact') return { Component: ContactPage, params: {} };
    if (pathname === '/login') return { Component: LoginPage, params: {} };
    if (pathname === '/register') return { Component: RegisterPage, params: {} };
    if (pathname === '/profile') return { Component: ProfilePage, params: {} };

    // Dynamic Route: /properties/[id]
    const propMatch = pathname.match(/^\/properties\/([^/?#]+)/);
    if (propMatch) {
      return { Component: PropertyDetailPage, params: { id: decodeURIComponent(propMatch[1]) } };
    }

    // Dynamic Route: /agents/[id]
    const agentMatch = pathname.match(/^\/agents\/([^/?#]+)/);
    if (agentMatch) {
      return { Component: AgentProfilePage, params: { id: decodeURIComponent(agentMatch[1]) } };
    }

    return { Component: NotFound, params: {} };
  }, [pathname]);

  // Synchronize dynamic params with the context
  useEffect(() => {
    if (router?.setRouteParams) {
      router.setRouteParams(params);
    }
  }, [params, router]);

  return (
    <RootLayout>
      <Component params={params} />
    </RootLayout>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <RouteDispatcher />
    </RouterProvider>
  );
}
