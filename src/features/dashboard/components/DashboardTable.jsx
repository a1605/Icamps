import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./DashboardTable.scss";
import DashboardTableSkeleton from "./DashboardTableSkeleton";
export default function DashboardTable({ tableType, cols, color, isLoading }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, backgroundColor: color }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#6467E4", fontSize: "20px" }}>
                <strong>Inventory</strong>
              </TableCell>
              {tableType === "inventory" && (
                <TableCell
                  align="center"
                  sx={{ color: "#494949", fontSize: "16x" }}
                >
                  <strong>Approved / Published</strong>{" "}
                </TableCell>
              )}
              <TableCell
                align="center"
                sx={{ color: "#494949", fontSize: "16x" }}
              >
                <strong>In-Progress</strong>
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#494949", fontSize: "16x" }}
              >
                <strong>In-Approval</strong>{" "}
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#494949", fontSize: "16x" }}
              >
                <strong>In-Advice</strong>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          {!isLoading ? (
            <TableBody>
              {cols.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {Object.keys(item)[0]}
                  </TableCell>
                  {tableType === "inventory" && (
                    <TableCell align="center" sx={{ fontSize: "16px" }}>
                      {item[Object.keys(item)[0]].APPROVED}
                    </TableCell>
                  )}
                  <TableCell align="center">
                    {item[Object.keys(item)[0]].IN_PROGRESS}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px" }}>
                    {item[Object.keys(item)[0]].IN_APPROVAL +
                      item[Object.keys(item)[0]].REQ_UNPUBLISHED}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px" }}>
                    {item[Object.keys(item)[0]].ADVICE_C +
                      item[Object.keys(item)[0]].ADVICE_A}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <DashboardTableSkeleton tableType={tableType} rowCount={5} />
          )}
        </Table>
      </TableContainer>
    </>
  );
}
