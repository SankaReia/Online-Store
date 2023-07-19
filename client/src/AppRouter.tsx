import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminRoutes, publicRoutes, categoryRoutes } from "./routes";
import Layout from "./components/admin/Layout";
import PicturePage from "./pages/PicturePage";
import LayOut from "./components/LayOut";
import useAuth from "./hooks/useAuth";

const AppRouter: FC = () => {
  const { isAdmin, isAuth } = useAuth();

  return (
    <Routes>
      <Route element={<LayOut />}>
        {isAdmin && (
          <Route path="/admin" element={<Layout />}>
            {AdminRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        )}

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {categoryRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {categoryRoutes.map(({ path }) => (
          <Route key={path} path={path + "/:id"} element={<PicturePage />} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;
