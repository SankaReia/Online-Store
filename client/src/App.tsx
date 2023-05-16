import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminRoutes, publicRoutes, categoryRoutes } from "./routes";
import { createTheme, ThemeProvider } from "@mui/material";
import { Theme } from "@emotion/react";
import Layout from "./components/admin/Layout";
import PicturePage from "./pages/PicturePage";
import LayOut from "./components/LayOut";
import useAuth from "./hooks/useAuth";
import { check } from "./http/userAPI";
import { useAppDispatch } from "./hooks/redux";
import { setUser } from "./store/slices/userSlice";

declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      primary: {
        main: string;
      };
    };
  }
}
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#1A1C29",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isAdmin } = useAuth();

  useEffect(() => {
    try {
      check().then((data) =>
        dispatch(setUser({ id: data.id, email: data.email, role: data.role }))
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
