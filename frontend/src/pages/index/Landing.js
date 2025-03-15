// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Grid2";

// Components
import TotalBlock from "../../components/TotalBlock";

// Utils
import { Colors, PageGutter, covidData } from "../../common/constants";

const Landing = () => {
    return (
        <Stack px={PageGutter} py={3} boxSizing={"border-box"} spacing={4}>
            {/* <Typography variant="h1">Landing</Typography> */}
            <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <TotalBlock
                        title="Confirmed"
                        total={covidData.totals.totalConfirmedCases}
                        color={Colors.red}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <TotalBlock
                        title="Active"
                        total={covidData.totals.totalActiveCases}
                        color={Colors.blue}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <TotalBlock
                        title="Recovered"
                        total={covidData.totals.totalRecovered}
                        color={Colors.green}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <TotalBlock
                        title="Deaths"
                        total={covidData.totals.totalDeaths}
                        color={Colors.grey}
                    />
                </Grid2>
            </Grid2>
        </Stack>
    );
};

export default Landing;
