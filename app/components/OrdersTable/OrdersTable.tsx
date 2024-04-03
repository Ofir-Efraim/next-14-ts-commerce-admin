import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { order, orderItem } from "@/app/types";

type ordersTableProps = {
  orders: order[];
  onDeleteOrder: (orderId: string) => void;
  onMarkOrderDelivered: (orderId: string) => void;
  setIsNew: Dispatch<SetStateAction<boolean>>;
};

const OrdersTable = ({
  orders,
  onDeleteOrder,
  onMarkOrderDelivered,
  setIsNew,
}: ordersTableProps) => {
  const [showOnlyNew, setShowOnlyNew] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlyNew(event.target.checked);
    setIsNew(event.target.checked);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentOrders = orders.slice(firstIndex, lastIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <div style={{ margin: "10px 40px" }}>
      <h1 style={{ textAlign: "center" }}>הזמנות</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  border: "1px solid black",
                  borderBottom:"3px solid #50C878",
                },
              }}
            >
              <TableCell align="right">
                <Checkbox
                  checked={showOnlyNew}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
                הצג רק הזמנות חדשות
              </TableCell>
              <TableCell align="right">מחק</TableCell>
              <TableCell align="right">סמן כסופק</TableCell>
              <TableCell align="right">סטטוס</TableCell>
              <TableCell align="right">סכום כולל</TableCell>
              <TableCell align="right">מוצרים</TableCell>
              <TableCell align="right">נקודת איסוף / כתובת למשלוח</TableCell>
              <TableCell align="right">מספר טלפון</TableCell>
              <TableCell align="right">אימייל</TableCell>
              <TableCell align="right">שם משפחה</TableCell>
              <TableCell align="right">שם פרטי</TableCell>
              <TableCell align="right">תאריך הזמנה</TableCell>
              <TableCell align="right">מספר הזמנה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((order, index) => (
              <TableRow
                sx={{
                  "& .MuiTableCell-root": {
                    border: "1px solid black",
                    borderBottom:"3px solid #50C878"
                  },
                }}
                key={order.id}
              >
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onDeleteOrder(order.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onMarkOrderDelivered(order.id)}>
                    <LocalShippingIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {order.status === "new" ? "חדש" : "סופק"}
                </TableCell>
                <TableCell align="right">₪ {order.totalPrice} </TableCell>
                <TableCell align="right">
                  <ul style={{ listStyle: "none" }}>
                    {order.products.map((product: orderItem, index: number) => (
                      <li
                        key={product.id}
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "20px",
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{product.name}</span>
                          <span>{product.quantity}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell align="right">
                  {order.pickupSpot ? order.pickupSpot : order.address}
                </TableCell>
                <TableCell align="right">{order.phoneNumber}</TableCell>
                <TableCell align="right">{order.email}</TableCell>
                <TableCell align="right">{order.lastName}</TableCell>
                <TableCell align="right">{order.firstName}</TableCell>
                <TableCell align="right">{order.date}</TableCell>
                <TableCell align="right">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(orders.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default OrdersTable;
