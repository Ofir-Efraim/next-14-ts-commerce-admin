import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  Popover,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { location, order, orderItem } from "@/app/types";
import { Paid, Refresh, ShoppingBag } from "@mui/icons-material";
import CustomFilter from "./CustomFilter/CustomFilter";
import { getLocations } from "@/app/api";

type ordersTableProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rows_per_page: number;
  totalOrders: number;
  orders: order[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  onDeleteOrder: (orderId: string) => void;
  onToggleOrderStatus: (orderId: string, status: string) => void;
  onToggleOrderBagged: (orderId: string, bagged: boolean) => void;
  onToggleOrderPaid: (orderId: string, paid: boolean) => void;
  handleAddQuery: (queryKey: string, queryValue: string) => void;
  handleRemoveQuery: (queryKey: string, queryValue?: string) => void;
};

const OrdersTable = ({
  page,
  setPage,
  rows_per_page,
  totalOrders,
  orders,
  search,
  setSearch,
  onDeleteOrder,
  onToggleOrderStatus,
  onToggleOrderBagged,
  onToggleOrderPaid,
  handleAddQuery,
  handleRemoveQuery,
}: ordersTableProps) => {
  const [clicked, setClicked] = useState(false);
  const [statusAnchorEl, setStatusAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [pickupSpotAnchorEl, setPickupSpotAnchorEl] =
    useState<HTMLElement | null>(null);
  const [status, setStatus] = useState<string[]>([]);
  const [pickupSpot, setPickupSpot] = useState<string[]>([]);
  const [locations, setLocations] = useState<location[]>([]);
  const [paidAnchorEl, setPaidAnchorEl] = useState<HTMLElement | null>(null);
  const [paid, setPaid] = useState<string[]>([]);
  const [baggedAnchorEl, setBaggedAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [bagged, setBagged] = useState<string[]>([]);
  const handleRefreshClick = () => {
    setClicked(true);
    setPage(1);
    setTimeout(() => {
      setClicked(false);
    }, 200);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const fetchLocations = async () => {
    const res = await getLocations();
    setLocations(res.data.locations);
  };
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    queryKey: string
  ) => {
    const value = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      handleAddQuery(queryKey, value);
    } else {
      handleRemoveQuery(queryKey, value);
    }

    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  useEffect(() => {
    fetchLocations();
  }, []);
  return (
    <div style={{ margin: "10px 40px" }}>
      <h1 style={{ textAlign: "center" }}>הזמנות</h1>
      <Popover
        open={clicked}
        anchorReference="none"
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        style={{
          padding: "20px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            fontSize: "28px",
            padding: "30px",
          }}
        >
          ... מעדכן הזמנות
        </div>
      </Popover>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          style={{ width: "40%", margin: "10px 0", direction: "rtl" }}
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomFilter
          buttonLabel="סינון לפי סטטוס הזמנה"
          tracker={status}
          setTracker={setStatus}
          anchorEl={statusAnchorEl}
          setAnchorEl={setStatusAnchorEl}
          handleCheckboxChange={handleCheckboxChange}
          queryKey="status"
          queryOptions={[
            { label: "הצג הזמנות חדשות", value: "new" },
            { label: "הצג הזמנות שסופקו", value: "delivered" },
          ]}
        />
        <CustomFilter
          buttonLabel="סינון לפי שוק"
          tracker={pickupSpot}
          setTracker={setPickupSpot}
          anchorEl={pickupSpotAnchorEl}
          setAnchorEl={setPickupSpotAnchorEl}
          handleCheckboxChange={handleCheckboxChange}
          queryKey="pickupSpot"
          queryOptions={locations.map((location) => ({
            label: location.name,
            value: location.name,
          }))}
        />
        <CustomFilter
          buttonLabel="סינון לפי תשלום"
          tracker={paid}
          setTracker={setPaid}
          anchorEl={paidAnchorEl}
          setAnchorEl={setPaidAnchorEl}
          handleCheckboxChange={handleCheckboxChange}
          queryKey="paid"
          queryOptions={[
            { label: "הצג הזמנות ששולמו", value: "true" },
            { label: "הצג הזמנות שלא שולמו", value: "false" },
          ]}
        />
        <CustomFilter
          buttonLabel="סינון לפי שקית"
          tracker={bagged}
          setTracker={setBagged}
          anchorEl={baggedAnchorEl}
          setAnchorEl={setBaggedAnchorEl}
          handleCheckboxChange={handleCheckboxChange}
          queryKey="bagged"
          queryOptions={[
            { label: "הצג הזמנות שהוכנה שקית", value: "true" },
            { label: "הצג הזמנות שלא הוכנה שקית", value: "false" },
          ]}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  border: "1px solid black",
                  borderBottom: "3px solid #50C878",
                },
              }}
            >
              <TableCell align="right">מחק</TableCell>
              <TableCell align="right">סמן כהוכנה/לא הוכנה </TableCell>
              <TableCell align="right">סטטוס שקית</TableCell>
              <TableCell align="right">סמן כשולם/לא שולם </TableCell>
              <TableCell align="right">סטטוס תשלום</TableCell>
              <TableCell align="right">סמן כסופקה/חדשה </TableCell>
              <TableCell align="right">סטטוס הזמנה</TableCell>
              <TableCell align="right">סכום כולל</TableCell>
              <TableCell align="right">מוצרים</TableCell>
              <TableCell align="right">נקודת איסוף / כתובת למשלוח</TableCell>
              <TableCell align="right">מספר טלפון</TableCell>
              <TableCell align="right">אימייל</TableCell>
              <TableCell align="right">שם משפחה</TableCell>
              <TableCell align="right">שם פרטי</TableCell>
              <TableCell align="right">תאריך הזמנה</TableCell>
              <TableCell align="right">מספר הזמנה</TableCell>
              <TableCell align="right">
                <Refresh
                  onClick={handleRefreshClick}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                sx={{
                  "& .MuiTableCell-root": {
                    border: "1px solid black",
                    borderBottom: "3px solid #50C878",
                  },
                }}
                key={order.id}
              >
                <TableCell align="right">
                  <IconButton onClick={() => onDeleteOrder(order.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onToggleOrderBagged(order.id, order.bagged)}
                  >
                    <ShoppingBag
                      style={{
                        color: order.bagged ? "green" : "red",
                      }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {order.bagged ? "הוכנה שקית" : "לא הוכנה שקית"}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onToggleOrderPaid(order.id, order.paid)}
                  >
                    <Paid
                      style={{
                        color: order.paid ? "green" : "red",
                      }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {order.paid ? "שולם" : "לא שולם"}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onToggleOrderStatus(order.id, order.status)}
                  >
                    <LocalShippingIcon
                      style={{
                        color: order.status === "new" ? "green" : "blue",
                      }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {order.status === "new" ? "חדשה" : "סופקה"}
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
                  {totalOrders - (page - 1) * rows_per_page - index}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(totalOrders / rows_per_page)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default OrdersTable;
