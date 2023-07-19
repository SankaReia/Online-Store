import { FC, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Theme } from "@emotion/react";
import { check } from "./http/userAPI";
import { useAppDispatch } from "./hooks/redux";
import { setUser } from "./store/slices/userSlice";
import AppRouter from "./AppRouter";

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
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
