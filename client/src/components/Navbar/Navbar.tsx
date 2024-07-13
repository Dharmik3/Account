import React from "react";
import { IcecreamTwoTone } from "@mui/icons-material";
import { AppBar, Avatar, Box, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isTransactionOpen, setIsTranactionOpen] = React.useState(false);
  const [isAccountOpen, setIsAccountOpen] = React.useState(false);
  const [isDailyAccountOpen, setIsDailyAccountOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //   @ts-ignore
    if (event.target?.id === "transaction") {
      setIsTranactionOpen(true);
    }
    //   @ts-ignore
    if (event.target?.id === "masters") {
      setIsAccountOpen(true);
    }
    //   @ts-ignore
    if (event.target?.id === "account") {
      setIsDailyAccountOpen(true);
    }
    setAnchorEl(event.currentTarget);
  };
  return (
    <AppBar
      elevation={1}
      sx={{
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        px: 6,
        position: "static",
        backgroundColor: "dodgerblue",
      }}
    >
      <IcecreamTwoTone
        fontSize="large"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      />
      <Typography fontWeight={600} fontSize={20} ml={1}>
        Software
      </Typography>
      <Box
        sx={{
          ml: "auto",
          display: "flex",
          gap: 4,
          alignItems: "center",
          color: "whitesmoke",
        }}
      >
        <Box>
          <Typography
            id="account"
            onClick={handleClick}
            onMouseOver={handleClick}
          >
            Account
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={isDailyAccountOpen}
            onClose={() => setIsDailyAccountOpen(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            MenuListProps={{ onMouseLeave: () => setIsDailyAccountOpen(false) }}
          >
            <MenuItem
              onClick={() => {
                navigate("/daily-book");
                setIsDailyAccountOpen(false);
              }}
            >
              Daily Book
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/ledger");
                setIsDailyAccountOpen(false);
              }}
            >
              Ledger
            </MenuItem>
          </Menu>
        </Box>
        <Box>
          <Typography
            id="transaction"
            onClick={handleClick}
            onMouseOver={handleClick}
          >
            Transaction
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={isTransactionOpen}
            onClose={() => setIsTranactionOpen(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            MenuListProps={{ onMouseLeave: () => setIsTranactionOpen(false) }}
          >
            <MenuItem
              onClick={() => {
                navigate("/journal-entry");
                setIsTranactionOpen(false);
              }}
            >
              Journal Entry
            </MenuItem>
          </Menu>
        </Box>
        <Box>
          <Typography
            id="masters"
            onClick={handleClick}
            onMouseOver={handleClick}
          >
            Masters
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={isAccountOpen}
            onClose={() => setIsAccountOpen(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            MenuListProps={{ onMouseLeave: () => setIsAccountOpen(false) }}
          >
            <MenuItem
              onClick={() => {
                navigate("/account-master");
                setIsAccountOpen(false);
              }}
            >
              Account Master
            </MenuItem>
          </Menu>
        </Box>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Box>
    </AppBar>
  );
};

export default Navbar;
