import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { product } from "@/app/types";
import Image from "next/image";
import QuantityEditor from "./QuantityEditor/QuantityEditor";

type ProductsTableProps = {
  products: product[];
  onToggleActive: (productId: string) => void;
  onDelete: (productId: string) => void;
  onEdit: (productId: string) => void;
};

const ProductsTable = ({
  products,
  onToggleActive,
  onDelete,
  onEdit,
}: ProductsTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                border: "1px solid black",
                borderBottom: "2px solid black",
              },
            }}
          >
            <TableCell align="left"></TableCell>
            <TableCell align="center">פעיל</TableCell>
            <TableCell align="center">מחיר</TableCell>
            <TableCell align="center">כמות</TableCell>
            <TableCell align="center">שם</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  border: "1px solid black",
                  borderBottom: "2px solid black",
                  backgroundColor:
                    product.quantity >= 0
                      ? "rgba(0, 255, 0, 0.2)"
                      : "rgba(255, 0, 0, 0.2)",
                },
              }}
              key={product.id}
            >
              <TableCell align="left">
                <IconButton onClick={() => onDelete(product.id)} color="error">
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => onEdit(product.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <Switch
                  checked={product.active}
                  onChange={() => onToggleActive(product.id)}
                  color="primary"
                />
              </TableCell>
              <TableCell align="center">₪ {product.price}</TableCell>
              <TableCell align="center">
                <QuantityEditor product={product} />
              </TableCell>
              <TableCell align="center">{product.name}</TableCell>
              <TableCell align="right">
                <Image
                  src={
                    typeof product.picture === "string" ? product.picture : ""
                  }
                  alt={product.name}
                  width={50}
                  height={50}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
