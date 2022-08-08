import React, { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import {
    Grid,
    Stack,
    TextField,
    Button,
  } from "@mui/material";
  import BaseCard from "../../src/components/baseCard/BaseCard";

const Add = () => {
    const[slug,setslug]=useState("");
    const[title,settitle]=useState("");
    const[image,setimage]=useState("");
    const[desc,setdesc]=useState("");
    const[color,setcolor]=useState("");
    const[size,setsize]=useState("");
    const[category,setcategory]=useState("");
    const[price,setprice]=useState("");
    const[availableQty,setavailableQty]=useState("");
    const onchange=(e)=>{
      if(e.target.name=="slug"){
        setslug(e.target.value);
      }
      if(e.target.name=="title"){
        settitle(e.target.value);
      }
      if(e.target.name=="image"){
        setimage(e.target.value);
      }
      if(e.target.name=="desc"){
        setdesc(e.target.value);
      }
      if(e.target.name=="color"){
        setcolor(e.target.value);
      }
      if(e.target.name=="size"){
        setsize(e.target.value);
      }
      if(e.target.name=="category"){
        setcategory(e.target.value);
      }
      if(e.target.name=="price"){
        setprice(e.target.value);
      }
      if(e.target.name=="availableQty"){
        setavailableQty(e.target.value);
      }
    }
    const submitForm=async ()=>{
        const data = {title,slug,image,desc,color,size,category,price,availableQty};
        console.log(data);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproduct`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data),
    })
    let response = await res.json()
    console.log(response)
    }
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
        <BaseCard title="Add Product">
          <Stack spacing={3}>
            <TextField
             onChange={onchange} value={title?title:""}
              name="title"
              label="Title"
              variant="outlined"
            />
            <TextField onChange={onchange} value={price} name="price" label="Price" type="number" variant="outlined" />
            <TextField onChange={onchange} value={color} name="color" label="Color" variant="outlined" />
            <TextField onChange={onchange} value={size} name="size" label="Size" variant="outlined" />
            <TextField onChange={onchange} value={slug} name="slug" label="Slug" variant="outlined" />
            <TextField onChange={onchange} value={image} name="image" label="Image" variant="outlined" />
            <TextField onChange={onchange} value={category} name="category" label="Product category" variant="outlined" />
            <TextField onChange={onchange} value={availableQty}
              name="availableQty"
              label="Quantity"
              type="number"
              variant="outlined"
            />
            <TextField
            onChange={onchange}
            value={desc}
              name="desc"
              label="Product Description"
              multiline
              rows={4}
            />
            
          </Stack>
          <br />
          <Button onClick={submitForm} variant="outlined" mt={2}>
            Submit
          </Button>
        </BaseCard>
      </Grid>

      
    </Grid>
    </FullLayout>
    </ThemeProvider>
  )
}

export default Add