import { useState } from "react";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { bookHotel, requestMts } from "../utils/data";

import {
  BookHotelRequest,
  initBookHotel,
  initproduct,
  PolygonIdMetadata,
  Product,
} from "../utils/interfaces";
import { CaminoMessengerService } from "../utils/messenger";
import ResultCard from "./components/ResultCart";

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

  const [products, setProducts] = useState<Product[]>(initproduct);

  const handleSubmit = async ({
    sDate,
    eDate,
    productCode,
  }: {
    sDate: string;
    eDate: string;
    productCode: number;
  }) => {
    console.log(sDate, eDate, productCode);

    const bookingData: PolygonIdMetadata<BookHotelRequest> = {
      ...initBookHotel,
      credentialSubject: {
        id: userId,
        hotelName: "hi",
        checkIn: sDate,
        checkOut: eDate,
        supplierNumber: 21,
        supplierProductNumber: productCode,
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

  // const caminoMessenger = new CaminoMessengerService();

  // const searchAvalibility = async () => {
  //   try {
  //     const respose = await caminoMessenger.accomodationSearch({
  //       startDate: startDate,
  //       endDate: endDate,
  //       supplier: supplier,
  //     });
  //   } catch {}
  // };

  // const searchAvalibility = async () => {
  //   try {
  //     const respose = await caminoMessenger.accomodationService({
  //       startDate: startDate,
  //       endDate: endDate,
  //       supplier: supplier,
  //     });

  //     console.log(respose);
  //   } catch (error) {
  //     console.log(error);

  //     enqueueSnackbar(`${error}`);
  //   }
  // };

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
            {/* <TextField
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
            </TextField> */}
          </Grid>

          <Grid item>
            <DatePicker
              value={dayjs(startDate)}
              onChange={(newValue) =>
                setStartDate(dayjs(newValue)?.format("YYYY-MM-DD") ?? "")
              }
              format="DD-MM-YYYY"
            />
          </Grid>

          <Grid item>
            <DatePicker
              value={dayjs(endDate)}
              onChange={(newValue) =>
                setEndDate(dayjs(newValue)?.format("YYYY-MM-DD") ?? "")
              }
              format="DD-MM-YYYY"
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              size="large"
              // onClick={() => searchAvalibility()}
              // onClick={() => getBooking()}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item alignItems="center" direction="column">
        {products.length > 0 &&
          products.map((result) => {
            return (
              <ResultCard
                handleSubmit={(productCode: number) =>
                  handleSubmit({
                    productCode,
                    sDate: startDate,
                    eDate: endDate,
                  })
                }
                roomNumber={result.unitsList[0].supplierRoomCode}
                roomName={result.unitsList[0].supplierRoomName}
                remainingUnits={result.unitsList[0].remainingUnits}
              />
            );
          })}
      </Grid>
    </Box>
  );
}
