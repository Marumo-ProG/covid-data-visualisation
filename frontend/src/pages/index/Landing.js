import { useState, useEffect } from "react";

import dayjs from "dayjs";

// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Grid2";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";

// Components
import TotalBlock from "../../components/TotalBlock";
import Graph from "../../components/Graph";
import Calendar from "../../components/Calendar";

// Utils
import { Colors, PageGutter, covidData } from "../../common/constants";

// Icons
import CloseIcon from "@mui/icons-material/Close";

const Landing = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [graphType, setGraphType] = useState("line");
    const [selectedDate, setSelectedDate] = useState(null);
    const [dayData, setDayData] = useState(null);

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

    const handleDateSelect = (date) => {
        setSelectedDate(dayjs(date).format("YYYY/MM/DD"));
    };
    const handleCancelDate = () => {
        setSelectedDate(null);
        setDayData(null);
        setSelectedFilter("all");
        setGraphType("line");
    };

    useEffect(() => {
        if (selectedDate) {
            setDayData(covidData.records.find((record) => record.date === selectedDate));
            setSelectedFilter("all");
            setGraphType("bar");
        }
    }, [selectedDate]);
    return (
        <Stack px={PageGutter} py={3} boxSizing={"border-box"} spacing={4}>
            <Stack direction="row" spacing={3} alignItems={"center"}>
                <Calendar
                    minDate={dayjs(covidData.records[0].date)}
                    maxDate={dayjs(covidData.records[covidData.records.length - 1].date)}
                    handleOnChange={handleDateSelect}
                    defaultValue={null}
                    value={selectedDate ? dayjs(selectedDate) : null}
                />
                {dayData && (
                    <IconButton onClick={handleCancelDate}>
                        <CloseIcon />
                    </IconButton>
                )}
            </Stack>
            <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <TotalBlock
                        title={dayData ? "Daily Confirmed" : "Confirmed"}
                        total={
                            dayData ? dayData.dailyConfirmed : covidData.totals.totalConfirmedCases
                        }
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
                        title={dayData ? "Daily Deaths" : "Deaths"}
                        total={dayData ? dayData.dailyDeaths : covidData.totals.totalDeaths}
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

                    <Stack direction="row" spacing={3} alignItems={"center"}>
                        <FormControl sx={{ width: 200 }}>
                            <InputLabel id="graph-type">Graph Type</InputLabel>
                            <Select
                                value={graphType}
                                onChange={(event) => setGraphType(event.target.value)}
                                label="Graph Type"
                            >
                                <MenuItem value="line">Line</MenuItem>
                                <MenuItem value="bar">Bar</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
            </Stack>
            <Graph
                type={graphType}
                labels={dayData ? [dayData.date] : covidData.records.map((record) => record.date)}
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
