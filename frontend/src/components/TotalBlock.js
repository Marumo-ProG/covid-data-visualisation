// MUI
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const TotalBlock = ({ title, total, color, handleClick }) => {
    return (
        <Stack
            padding={2}
            sx={{ backgroundColor: `${color}1A`, height: "131px", borderRadius: 4 }}
            justifyContent={"space-between"}
        >
            <Typography variant="h6" sx={{ color: color }}>
                {title}
            </Typography>
            <Typography variant="h4" sx={{ color: color, textAlign: "end" }}>
                {total}
            </Typography>
        </Stack>
    );
};

export default TotalBlock;
