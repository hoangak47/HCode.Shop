import { Routes, Route } from 'react-router-dom';
import publicRoutes from './config/routes';
import DefaultLayout from './Layout/DefaultLayout';
import { Fragment } from 'react';

function App() {
    return (
        <>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact ? route.exact : false}
                            element={<Layout>{<Page />}</Layout>}
                        />
                    );
                })}
            </Routes>
        </>
    );
}

export default App;
