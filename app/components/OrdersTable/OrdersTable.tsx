import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { order, orderItem } from "@/app/types";

type ordersTableProps = {
  orders: order[];
  onDeleteOrder: (orderId: string) => void;
};

const OrdersTable = ({ orders, onDeleteOrder }: ordersTableProps) => {
  return (
    <div style={{ margin: "10px 40px" }}>
      <h1 style={{ textAlign: "center" }}>הזמנות</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">פעולות</TableCell>
              <TableCell align="right">סכום כולל</TableCell>
              <TableCell align="right">מוצרים</TableCell>
              <TableCell align="right">נקודת איסוף / כתובת למשלוח</TableCell>
              <TableCell align="right">מספר טלפון</TableCell>
              <TableCell align="right">אימייל</TableCell>
              <TableCell align="right">שם משפחה</TableCell>
              <TableCell align="right">שם פרטי</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell align="right">
                  <IconButton onClick={() => onDeleteOrder(order.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">₪ {order.totalPrice} </TableCell>
                <TableCell align="right">
                  <ul style={{ listStyle: "none" }}>
                    {order.products.map((product: orderItem) => (
                      <li key={product.id}>
                        {product.quantity} x {product.name}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell align="right">
                  {order.pickupSpot ? order.pickupSpot : order.address}
                </TableCell >
                <TableCell align="right">{order.phoneNumber}</TableCell>
                <TableCell align="right">{order.email}</TableCell>
                <TableCell align="right">{order.lastName}</TableCell>
                <TableCell align="right">{order.firstName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
