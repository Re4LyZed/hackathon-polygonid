import { Box, Button, Card, Grid, Typography } from "@mui/material";

interface ResultCardProps {
  handleSubmit: (productCode: string) => Promise<void>;
  supplierRoomCode: string;
  roomName: string;
  index: number;
  remainingUnits: number;
}

export default function ResultCard({
  handleSubmit,
  supplierRoomCode,
  roomName,
  index,
}: ResultCardProps) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <Grid
        container
        direction="row"
        width={900}
        height={150}
        gap={3}
        alignItems="center"
        justifyContent="space-between"
        paddingX={2}
      >
        <Grid item>
          <Box
            component="img"
            sx={{
              height: 120,
              width: 120,
              backgroundColor: "#897c8a",
              borderRadius: 3,
            }}
            alt="no comprende"
            src={`https://source.unsplash.com/random/?Hotel&${index}`}
          />
        </Grid>

        <Grid item container direction="column" xs={4}>
          <Grid item>
            <Typography variant="h6">{roomName}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">({supplierRoomCode})</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          item
          direction="column"
          justifyContent="space-between"
          alignItems="flex-end"
          xs={3}
          height="100%"
          padding={1}
        >
          <Grid item>
            <Typography>
              Remaining units: {Math.floor(Math.random() * 3)}
            </Typography>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                handleSubmit(supplierRoomCode);
              }}
            >
              Book
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
