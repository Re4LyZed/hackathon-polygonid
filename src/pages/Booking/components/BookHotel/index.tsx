import { useState } from "react";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers";
import LoadingButton from "@mui/lab/LoadingButton";

import Grid from "@mui/material/Grid";
import ResultCard from "./components/ResultCart";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import {
  BookHotelRequest,
  initBookHotel,
  PolygonIdMetadata,
  Product,
} from "../utils/interfaces";

import { bookHotel } from "../utils/data";

import { accomodationSearch } from "../utils/messenger";

interface BookHotelProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export default function BookHotel({ userId, setUserId }: BookHotelProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [startDate, setStartDate] = useState<string>("11-11-2024");
  const [endDate, setEndDate] = useState<string>("11-18-2024");
  const [loading, setLoading] = useState<boolean>(false);

  const [supplier, setSupplier] = useState<string>(
    "t-kopernikus1xpglq9kzg8pls6hyuhr39xuerqgxakr9dsp3k2"
  );

  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async () => {
    console.log(startDate, endDate);

    setLoading(true);
    setProducts([]);
    try {
      const response = await accomodationSearch({
        startDate: startDate,
        endDate: endDate,
        supplier: supplier,
      });

      if ((response as { resultsList: Product[] }).resultsList?.length > 0) {
        setProducts((response as { resultsList: Product[] }).resultsList);
      } else {
        enqueueSnackbar("no results", { variant: "error" });
      }
      setLoading(false);
    } catch {
      enqueueSnackbar("error fetching results", { variant: "error" });
      setLoading(false);
    }
  };

  console.log(products);

  const handleSubmit = async ({
    sDate,
    eDate,
    productCode,
  }: {
    sDate: string;
    eDate: string;
    productCode: string;
  }) => {
    const bookingData: PolygonIdMetadata<BookHotelRequest> = {
      ...initBookHotel,
      credentialSubject: {
        id: userId,
        hotelName: "hi",
        checkIn: dayjs(sDate).format("YYYY-MM-DD"),
        checkOut: dayjs(eDate).format("YYYY-MM-DD"),
        supplierNumber: 21 ?? 0,
        supplierProductCode: productCode,

        supplierProductType: "hi",
      },

      expiration: dayjs(eDate).toISOString(),
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

  return (
    <Grid container direction="column" width="100%">
      <Grid container item gap={1} direction="column" width="100%">
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
              <MenuItem value="t-kopernikus1xpglq9kzg8pls6hyuhr39xuerqgxakr9dsp3k2">
                MTS
              </MenuItem>

              <MenuItem value="t-kopernikus14e2psc7uxz83fhrmfh52aynfh96vaacq2s92u0">
                AVRA
              </MenuItem>
            </TextField>
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
            <LoadingButton
              variant="contained"
              size="large"
              onClick={() => handleSearch()}
              loading={loading}
            >
              Search
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        item
        alignItems="center"
        direction="column"
        width="100%"
        gap={1}
      >
        {products.length > 0 &&
          products.map((result) => {
            return (
              <Grid item>
                <ResultCard
                  handleSubmit={(productCode: string) =>
                    handleSubmit({
                      productCode,
                      sDate: startDate,
                      eDate: endDate,
                    })
                  }
                  supplierRoomCode={result.unitsList[0].supplierRoomCode}
                  roomName={result.unitsList[0].supplierRoomName}
                  remainingUnits={result.unitsList[0].remainingUnits}
                />{" "}
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
}
