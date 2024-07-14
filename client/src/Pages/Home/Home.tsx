import { Typography, Box } from "@mui/material";
import img from "../../assets/sample.jpg";
export const Home = () => {
  return (
    <Box sx={{ px: 8, my: 12 }}>
      <Box sx={{ display: "flex", gap: 8 }}>
        <Box>
          <Typography variant="h3" fontWeight={700}>
            Let's scale your business
          </Typography>
          <Typography variant="h6" color={"grey"}>
            Hire professionals who will help your business make 10X your
            previous income. With over 5years experience in Marketing & Business
            strategy, we are your best client.
          </Typography>
        </Box>
        <Box>
          <img
            src={img}
            alt="My Team"
            width={700}
            height={"auto"}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
