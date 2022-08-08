import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from "next/link";



const Allorders = ({orders}) => {
  return (
    <BaseCard title="Product Perfomance">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Order Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Phone
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Amount
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Order Details
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {order.orderId}
                </Typography>
              </TableCell>
              <TableCell>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {order.email}
                    </Typography>
                  </Box>
              </TableCell>
              <TableCell>
              <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {order.phone}
                    </Typography>
                  </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {order.amount}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6" >
                  <Link href={`${process.env.NEXT_PUBLIC_HOST}/order?clearCart=1&id=${order._id}`}> More details</Link>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default Allorders;