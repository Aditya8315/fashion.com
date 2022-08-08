import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import Allproducts from "../../src/components/dashboard/allproducts";
import mongoose from "mongoose";
import Product from "../../models/Product";

const View = ({products}) => {
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
        <Allproducts products={products}/>
      </Grid>
    </Grid>
    </FullLayout>
    </ThemeProvider>
  )
}

export default View
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products =await Product.find();
  return {
    props: {products: JSON.parse(JSON.stringify(products))} // will be passed to the page component as props
  }
}