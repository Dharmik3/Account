import { Typography, Box } from "@mui/material";
import heroImg from "../../assets/heroImage.jpeg";
export const Home = () => {
  return (
    <Box sx={{ px: 8, my: 12 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={2}>
          Smt C.R.Gardi Gayatri Highschool, Lei
        </Typography>
        <Typography variant="h6" color={"grey"} mb={4}>
          Work Hard, Dream Big
        </Typography>
        <img
          src={heroImg}
          alt="Lei Hoghschool pic"
          width={700}
          height={"auto"}
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};
