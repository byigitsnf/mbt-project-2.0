import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import TankPage from './pages/TankPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import Fundamentals from './pages/Fundamentals.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/tanks/:slug', element: <TankPage /> },
        { path: '/history', element: <ArticlePage id="history" key="history" /> },
        { path: '/history/nato', element: <ArticlePage id="nato" key="nato" /> },
        { path: '/fundamentals', element: <Fundamentals /> },
        { path: '/about', element: <About /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
