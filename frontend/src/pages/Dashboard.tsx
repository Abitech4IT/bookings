import { Header } from "../components/Header";
import BookingList from "../components/BookingList";
import { Box } from "@mui/material";

function Dashboard() {
  return (
    <Box>
      <Header />
      <BookingList />
    </Box>
  );
}

export default Dashboard;
