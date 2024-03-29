import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Skeleton } from "@mui/material";

export default function DashboardTableSkeleton({ tableType,rowCount }) {
  return (
    <TableBody>
      {Array.from(Array(rowCount).keys()).map((_item, index) => (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          {tableType==="inventory" &&<TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>}
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell sx={{ fontSize: "16px" }}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell sx={{ fontSize: "16px" }}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
