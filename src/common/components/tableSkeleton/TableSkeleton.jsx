import React from "react";
import { Skeleton } from "@mui/material";

export const TableSkeleton = ({ rowCount, colCount }) => {
  return (
    <tbody>
      {Array.from(Array(rowCount).keys()).map((_item, index) => (
        <tr key={index}>
          {Array.from(Array(colCount).keys()).map((_val, i) => (
            <td key={i}>
              <Skeleton />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
