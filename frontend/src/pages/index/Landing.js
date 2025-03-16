import { useState, useEffect } from "react";

import dayjs from "dayjs";

// MUI
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Grid2";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";

// Components
import TotalBlock from "../../components/TotalBlock";
import Graph from "../../components/Graph";
import Calendar from "../../components/Calendar";

// Utils
import { Colors, PageGutter } from "../../common/constants";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Images
import BannerImage from "../../common/banner.png";

const Landing = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [graphType, setGraphType] = useState("line");
    const [selectedDate, setSelectedDate] = useState(null);
    const [dayData, setDayData] = useState(null);
    const [covidData, setCovidData] = useState(null);

    useEffect(() => {
        fetchCovidData();
    }, []);

    const fetchCovidData = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + "covid/");
        console.log(response);
        await response
            .json()
            .then((data) => {
                setCovidData(data);
            })
            .catch((error) => {
                alert("error gettting covid data");
                console.error("Error fetching data: ", error);
            });
    };

    const graphData = [
        {
            label: "Confirmed",
            data: dayData
                ? [dayData.dailyConfirmed]
                : covidData?.records.map((record) => record.confirmed),
            borderColor: Colors.red,
            backgroundColor: graphType === "bar" ? Colors.red : `${Colors.red}1A`,
        },
        {
            label: "Active",
            data: dayData ? [dayData.active] : covidData?.records.map((record) => record.active),
            borderColor: Colors.blue,
            backgroundColor: graphType === "bar" ? Colors.blue : `${Colors.blue}1A`,
        },
        {
            label: "Recovered",
            data: dayData
                ? [dayData.recovered]
                : covidData?.records.map((record) => record.recovered),
            borderColor: Colors.green,
            backgroundColor: graphType === "bar" ? Colors.green : `${Colors.green}1A`,
        },
        {
            label: "Deaths",
            data: dayData
                ? [dayData.dailyDeaths]
                : covidData?.records.map((record) => record.deaths),
            borderColor: Colors.grey,
            backgroundColor: graphType === "bar" ? Colors.grey : `${Colors.grey}1A`,
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
            setDayData(covidData?.records.find((record) => record.date === selectedDate));
            setSelectedFilter("all");
            setGraphType("bar");

            console.log(covidData?.records.find((record) => record.date === selectedDate));
        }
    }, [selectedDate]);
    return (
        <Stack px={PageGutter} py={3} boxSizing={"border-box"} spacing={4}>
            <Stack direction="row" spacing={3} alignItems={"center"}>
                <CardMedia
                    component={"img"}
                    image={BannerImage}
                    alt="Banner"
                    sx={{
                        objectFit: "cover",
                        height: 500,
                        width: "50%",
                    }}
                />
                <Stack spacing={3}>
                    <Typography variant="h4">Welcome to Covid 19 Tracker</Typography>
                    <Typography variant="body1">
                        This is a simple Covid 19 tracker that shows the total number of confirmed
                        cases, active cases, recovered cases, and deaths.
                    </Typography>
                    <Typography variant="body1">
                        You can also filter the data by date and view the daily confirmed cases and
                        deaths.
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={3} alignItems={"center"}>
                {covidData && (
                    <Calendar
                        minDate={dayjs(covidData?.records[0].date)}
                        maxDate={dayjs(covidData?.records[covidData?.records.length - 1].date)}
                        handleOnChange={handleDateSelect}
                        defaultValue={null}
                        value={selectedDate ? dayjs(selectedDate) : null}
                    />
                )}
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
                        total={dayData ? dayData.dailyConfirmed : covidData?.totals.confirmed}
                        color={Colors.red}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <TotalBlock
                        title="Active"
                        total={covidData?.totals.active}
                        color={Colors.blue}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <TotalBlock
                        title="Recovered"
                        total={covidData?.totals.recovered}
                        color={Colors.green}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <TotalBlock
                        title={dayData ? "Daily Deaths" : "Deaths"}
                        total={dayData ? dayData.dailyDeaths : covidData?.totals.deaths}
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
                labels={dayData ? [dayData.date] : covidData?.records.map((record) => record.date)}
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
