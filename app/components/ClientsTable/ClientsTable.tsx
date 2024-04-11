import React, { Dispatch, SetStateAction } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { client } from "@/app/types";

type clientsTableProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rows_per_page: number;
  totalClients: number;
  clients: client[];
  onDeleteClient: (clientId: string) => void;
};

const ClientsTable = ({
  page,
  setPage,
  rows_per_page,
  totalClients,
  clients,
  onDeleteClient,
}: clientsTableProps) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <div style={{ margin: "10px 40px" }}>
      <h1 style={{ textAlign: "center" }}>לקוחות</h1>
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
              <TableCell align="left"></TableCell>
              <TableCell align="right">נקודת איסוף / כתובת למשלוח</TableCell>
              <TableCell align="right">מספר טלפון</TableCell>
              <TableCell align="right">אימייל</TableCell>
              <TableCell align="right">שם משפחה</TableCell>
              <TableCell align="right">שם פרטי</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                sx={{
                  "& .MuiTableCell-root": {
                    border: "1px solid black",
                    borderBottom: "3px solid #50C878",
                  },
                }}
                key={client.id}
              >
                <TableCell align="right">
                  <IconButton onClick={() => onDeleteClient(client.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {client.pickupSpot ? client.pickupSpot : client.address}
                </TableCell>
                <TableCell align="right">
                  <a href={`tel:${client.phone_number}`}>
                    {client.phone_number}
                  </a>
                </TableCell>
                <TableCell align="right">
                  <a href={`mailto:${client.email}`}>{client.email}</a>
                </TableCell>
                <TableCell align="right">{client.last_name}</TableCell>
                <TableCell align="right">{client.first_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(totalClients / rows_per_page)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default ClientsTable;
