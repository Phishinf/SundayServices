import React, { useEffect, useState } from 'react';
import AdminApp from './AdminApp';
import { CongregationView } from './components/CongregationView';

type Route = 'admin' | 'congregation';

function resolveRoute(): Route {
  return window.location.hash.replace(/^#\/?/, '').startsWith('congregation')
    ? 'congregation'
    : 'admin';
}

export default function App() {
  const [route, setRoute] = useState<Route>(resolveRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(resolveRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route === 'congregation' ? <CongregationView /> : <AdminApp />;
}
