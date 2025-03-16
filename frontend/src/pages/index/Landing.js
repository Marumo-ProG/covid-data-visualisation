import { useState, useEffect } from "react";

import dayjs from "dayjs";

// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Grid2";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

// Components
import TotalBlock from "../../components/TotalBlock";
import LineGraph from "../../components/LineGraph";
import Calendar from "../../components/Calendar";

// Utils
import { Colors, PageGutter, covidData } from "../../common/constants";

const Landing = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const graphData = [
        {
            label: "Confirmed",
            data: covidData.records.map((record) => record.confirmed),
            borderColor: Colors.red,
            backgroundColor: `${Colors.red}1A`,
        },
        {
            label: "Active",
            data: covidData.records.map((record) => record.active),
            borderColor: Colors.blue,
            backgroundColor: `${Colors.blue}1A`,
        },
        {
            label: "Recovered",
            data: covidData.records.map((record) => record.recovered),
            borderColor: Colors.green,
            backgroundColor: `${Colors.green}1A`,
        },
        {
            label: "Deaths",
            data: covidData.records.map((record) => record.deaths),
            borderColor: Colors.grey,
            backgroundColor: `${Colors.grey}1A`,
        },
    ];

    console.log(covidData.records[0].date);
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
            <Stack spacing={2}>
                <Typography variant="h6">Covid 19 Data overview</Typography>
                <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
                    <ToggleButtonGroup
                        exclusive
                        value={selectedFilter}
                        onChange={(_, value) =>
                            value !== selectedFilter && setSelectedFilter(value)
                        }
                    >
                        <ToggleButton value="all">All</ToggleButton>
                        <ToggleButton value="confirmed">Confirmed</ToggleButton>
                        <ToggleButton value="active">Active</ToggleButton>
                        <ToggleButton value="recovered">Recovered</ToggleButton>
                        <ToggleButton value="deaths">Deaths</ToggleButton>
                    </ToggleButtonGroup>

                    <Calendar
                        minDate={dayjs(covidData.records[0].date)}
                        maxDate={dayjs(covidData.records[covidData.records.length - 1].date)}
                    />
                </Stack>
            </Stack>
            <LineGraph
                labels={covidData.records.map((record) => record.date)}
                datasets={
                    selectedFilter === "all"
                        ? graphData
                        : graphData.filter((data) =>
                              data.label.toLowerCase().includes(selectedFilter)
                          )
                }
            />
        </Stack>
    );
};

export default Landing;
