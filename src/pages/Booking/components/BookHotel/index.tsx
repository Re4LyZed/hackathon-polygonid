import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

interface BookHotelProps {
  userId: string;
}

export default function BookHotel({ userId }: BookHotelProps) {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(7, "days"));
  const [location, setLocation] = useState<string>("");

  return (
    <Box p={4} borderRadius={3} height={600} width={900}>
      <Grid
        container
        gap={1}
        direction="column"
        justifyContent="center"
        height="100%"
      >
        <Grid
          container
          item
          gap={1}
          direction="row"
          width="100%"
          alignItems="center"
        >
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="england">England</MenuItem>
              <MenuItem value="croatia">Croatia</MenuItem>
              <MenuItem value="germany">Germany</MenuItem>
            </TextField>
          </Grid>

          <Grid item>
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </Grid>

          <Grid item>
            <DatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </Grid>

          <Grid item>
            <Button variant="contained" size="large">
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Typography variant="h6" component="h6">
          {userId}
        </Typography>
      </Grid>
    </Box>
  );
}
