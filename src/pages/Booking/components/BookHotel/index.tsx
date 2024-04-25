import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { bookHotel } from "../utils/data";
import { useSnackbar } from "notistack";
import {
  BookHotelRequest,
  initBookHotel,
  PolygonIdMetadata,
} from "../utils/interfaces";
import { CaminoMessengerService } from "../../../../api/camino/CaminoMessengerService";

interface BookHotelProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export default function BookHotel({ userId, setUserId }: BookHotelProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [startDate, setStartDate] = useState<string>(dayjs().toISOString());
  const [endDate, setEndDate] = useState<string>(
    dayjs().add(7, "days").toISOString()
  );
  const [supplier, setSupplier] = useState<string>(
    "t-kopernikus14e2psc7uxz83fhrmfh52aynfh96vaacq2s92u0"
  );

  const handleSubmit = async () => {
    const bookingData: PolygonIdMetadata<BookHotelRequest> = {
      ...initBookHotel,
      credentialSubject: {
        id: userId,
        hotelName: "hi",
        checkIn: startDate,
        checkOut: endDate,
        supplierNumber: 21,
        supplierProductNumber: 23,
        supplierProductType: "hi",
      },

      expiration: endDate,
    };

    try {
      const response = await bookHotel({ data: bookingData });

      if (response) {
        enqueueSnackbar("booking success", { variant: "success" });
        setUserId("");
      }
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
  };

  const caminoMessenger = new CaminoMessengerService();

  const searchAvalibility = async () => {
    try {
      const respose = await caminoMessenger.accommodationSearch({
        startDate: startDate,
        endDate: endDate,
        supplier: supplier,
      });

      console.log(respose);
    } catch (error) {
      console.log(error);

      enqueueSnackbar(`${error}`);
    }
  };

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
          justifyContent="space-between"
        >
          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            >
              <MenuItem value="t-kopernikus14e2psc7uxz83fhrmfh52aynfh96vaacq2s92u0">
                AVRA
              </MenuItem>
              <MenuItem value="t-kopernikus1xpglq9kzg8pls6hyuhr39xuerqgxakr9dsp3k2">
                MTS
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item>
            <DatePicker
              value={dayjs(startDate)}
              onChange={(newValue) =>
                setStartDate(newValue?.toISOString() ?? "")
              }
              format="DD-MM-YYYY"
            />
          </Grid>

          <Grid item>
            <DatePicker
              value={dayjs(endDate)}
              onChange={(newValue) => setEndDate(newValue?.toISOString() ?? "")}
              format="DD-MM-YYYY"
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={() => searchAvalibility()}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography px={4}>{userId}</Typography>
        </Grid>

        <Grid item>
          <Button variant="outlined" size="large" onClick={handleSubmit}>
            Book
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
