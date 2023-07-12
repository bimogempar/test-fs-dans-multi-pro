import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import LayoutUser from './components/LayoutUser';
import Login from './pages/Login';

const router = createBrowserRouter([
    {
        element: <LayoutUser />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ],
    },
    {
        path: '/login',
        element: <Login />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
