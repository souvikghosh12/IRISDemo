import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Pagination,
  PaginationItem,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";

function PeopleData() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsData, setRowsData] = useState<any[]>([]);
  const [total_count, setTotal_count] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const fetchPeopleData = (currentPage: number, currentRowsPerPage: number) => {
    const formData = new FormData();
    formData.append("offset", ((currentPage - 1) * currentRowsPerPage) as any);
    formData.append("limit", currentRowsPerPage as any);

    axios
      .post("http://20.217.64.227/api/entities", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Client-Secret": "asdfdsgvbrggre",
        },
      })
      .then((response) => {
        setTotal_count(response.data?.data?.total_count);
        setCount(response.data?.data?.count);
        setRowsData(response.data?.data?.Result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
    fetchPeopleData(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    const newRowsPerPage = event.target.value as number;
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    fetchPeopleData(1, newRowsPerPage);
  };

  useEffect(() => {
    fetchPeopleData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <Paper sx={{ padding: 2, backgroundColor: "transparent", color: "#fff" }}>
      <Typography variant="h6" fontSize={14} fontWeight={600} gutterBottom>
        People ({count} of {total_count} results)
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
        mb={2}
        pt={2}
        pb={2}
        sx={{
          borderTop: "1px solid #8e9dad",
          borderBottom: "1px solid #8e9dad",
        }}
      >
        <Box
          sx={{
            border: "1px solid #8e9dad",
            borderRadius: "8px",
            padding: "5px 0px",
          }}
        >
          <Pagination
            count={Math.ceil(total_count / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            size="small"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#8e9dad",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "transparent",
                color: "#0d6efd",
              },
            }}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  "&.Mui-selected": {
                    color: "#8e9dad",
                  },
                }}
              />
            )}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" sx={{ marginRight: 1, color: "#8e9dad" }}>
            Rows per page:
          </Typography>
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            size="small"
            sx={{
              color: "#fff",
              border: "1px solid #8e9dad",
              padding: "0px 0px",
            }}
          >
            {[5, 10, 25].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      {rowsData.map((row, index) => (
        <div
          key={index}
          className="flex justify-between hover:cursor-pointer align-top border pt-3 pb-3 glass-morfing-effect border-gray-600 mb-3 p-2 rounded-2xl"
        >
          <div className="flex gap-5">
            <Image
              src={row?.profile_image_url}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="mt-1">
              <p className="font-[600] text-[#fff] text-[14px]">
                {row?.phone_number}
              </p>
              <p className="flex gap-1 align-middle text-[#8E9DAD] text-[13px]">
                <Image
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${row?.country?.alpha2_code}.svg`}
                  alt="Profile"
                  width={20}
                  height={20}
                />
                {row?.country?.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <h3 className="font-[600] text-[#108de5] align-middle text-[13px] flex gap-1">
              Learn More
            </h3>
          </div>
        </div>
      ))}
    </Paper>
  );
}

export default PeopleData;
