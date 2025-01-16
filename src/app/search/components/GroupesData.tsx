"use client";

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
import CircularProgress from "./CircularProgress";
import dynamic from "next/dynamic";
function GroupesData() {
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
      .post("http://20.217.64.227/api/groups", formData, {
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
          className="flex justify-between align-top border hover:cursor-pointer pt-3 pb-3 glass-morfing-effect border-gray-600 mb-3 p-2 rounded-2xl"
        >
          <div className="flex gap-5">
            <Image
              src={row?.profile_image_url}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full object-contain"
            />
            <div className="">
              <p className="font-[600] text-[#fff] text-[14px]">
                {row?.group_name}
              </p>
              <p className="flex gap-1 align-middle text-[#8E9DAD] text-[12px]">
                Members :{" "}
                <span className="text-[#fff]">{row?.member_count}</span>
              </p>
              <p className="flex gap-1 align-middle text-[#8E9DAD] text-[12px]">
                Group Risk Score :{" "}
                <span className="text-[#fff]">
                  <CircularProgress percentage={Number(row?.risk_score)} />
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <h3 className=" font-[600] text-[#108de5] align-middle text-[13px] font-weight-[600] vertical-align: middle flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="mt-[2px]"
              >
                <path
                  d="M12 4.7C12 4.52319 11.9297 4.35362 11.8047 4.2286C11.6797 4.10357 11.5101 4.03333 11.3333 4.03333L5.99996 4C5.82315 4 5.65358 4.07024 5.52855 4.19526C5.40353 4.32029 5.33329 4.48986 5.33329 4.66667C5.33329 4.84348 5.40353 5.01305 5.52855 5.13807C5.65358 5.2631 5.82315 5.33333 5.99996 5.33333H9.70663L4.19329 10.86C4.13081 10.922 4.08121 10.9957 4.04737 11.0769C4.01352 11.1582 3.99609 11.2453 3.99609 11.3333C3.99609 11.4213 4.01352 11.5085 4.04737 11.5897C4.08121 11.671 4.13081 11.7447 4.19329 11.8067C4.25527 11.8692 4.329 11.9187 4.41024 11.9526C4.49148 11.9864 4.57862 12.0039 4.66663 12.0039C4.75463 12.0039 4.84177 11.9864 4.92301 11.9526C5.00425 11.9187 5.07798 11.8692 5.13996 11.8067L10.6666 6.28V10C10.6666 10.1768 10.7369 10.3464 10.8619 10.4714C10.9869 10.5964 11.1565 10.6667 11.3333 10.6667C11.5101 10.6667 11.6797 10.5964 11.8047 10.4714C11.9297 10.3464 12 10.1768 12 10V4.7Z"
                  fill="#108DE5"
                ></path>
              </svg>
              Learn More
            </h3>
          </div>
        </div>
      ))}
    </Paper>
  );
}

export default dynamic(() => Promise.resolve(GroupesData), { ssr: true });
