import { Box, Button, Card, Grid, Typography } from "@mui/material";

interface ResultCardProps {
  handleSubmit: (productCode: number) => Promise<void>;
  roomNumber: string;
  roomName: string;
  imgUrl?: string;
  remainingUnits: number;
}

export default function ResultCard({
  handleSubmit,
  roomNumber,
  roomName,
  imgUrl = "",
  remainingUnits,
}: ResultCardProps) {
  return (
    <Card>
      <Grid container direction="row" width={700} gap={4}>
        <Grid item xs={3}>
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
            }}
            alt="no comprende"
            src={imgUrl}
          />
        </Grid>

        <Grid item container direction="column" xs={3}>
          <Grid item>
            <Typography variant="h4">{roomName}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">room number: {roomNumber}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Typography>{remainingUnits}</Typography>
        </Grid>

        <Grid item>
          <Button onClick={() => handleSubmit(parseInt(roomNumber))}>
            Book
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
