// Context
import { ThemeProvider } from "@mui/material/styles";
import theme from "./common/theme";

// Pages
import Landing from "./pages/index/Landing";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Landing />
            </ThemeProvider>
        </>
    );
}

export default App;
