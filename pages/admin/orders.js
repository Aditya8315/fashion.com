import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import Allorders from '../../src/components/dashboard/allorders';
import mongoose from "mongoose";
import Order from "../../models/Order";

const Orders = ({orders}) => {
  return (
<ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <FullLayout>
      <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Allorders orders={orders} />
      </Grid>
    </Grid>
    </FullLayout>
    </ThemeProvider>
  )
}

export default Orders
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders =await Order.find();
  return {
    props: {orders: JSON.parse(JSON.stringify(orders))} // will be passed to the page component as props
  }
}