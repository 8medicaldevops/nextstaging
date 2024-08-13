"use client";

import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Status from "./Status";

const data = [
  {
    id: "m5gr84i9",
    ContactName:'Jogn Doe',
    amount: 316,
    status: "upcoming",
    datebooked: "15, Oct 2024",
    standbyVenue:"ilashe",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
  {
    id: "derv1ws0",
    ContactName:'Jogn blake',
    amount: 837,
    status: "completed",
    datebooked: "25, Oct 2024",
    standbyVenue:"waterpark",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
  {
    id: "5kma53ae",
    ContactName:'Jogn alake',
    amount: 874,
    status: "cancelled",
    datebooked: "18, Oct 2024",
    standbyVenue:"w-bar",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
  {
    id: "bhqecj4p",
    ContactName:'Jogn Bosco',
    amount: 721,
    status: "completed",
    datebooked: "18, Oct 2024",
    standbyVenue:"bayrock",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
  {
    id: "3u1reuv4",
    ContactName:'Jogn john',
    amount: 242,
    status: "upcoming",
    datebooked: "16, Oct 2024",
    standbyVenue:"sol beach",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
  {
    id: "derv1ws0",
    ContactName:'Jogn blake',
    amount: 837,
    status: "cancelled",
    datebooked: "25, Oct 2024",
    standbyVenue:"waterpark",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
  {
    id: "5kma53ae",
    ContactName:'Jogn alake',
    amount: 874,
    status: "upcoming",
    datebooked: "18, Oct 2024",
    standbyVenue:"w-bar",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
  {
    id: "bhqecj4p",
    ContactName:'Jogn Bosco',
    amount: 721,
    status: "completed",
    datebooked: "18, Oct 2024",
    standbyVenue:"bayrock",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
  {
    id: "derv1ws0",
    ContactName:'Jogn blake',
    amount: 837,
    status: "cancelled",
    datebooked: "25, Oct 2024",
    standbyVenue:"waterpark",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
  {
    id: "5kma53ae",
    ContactName:'Jogn alake',
    amount: 874,
    status: "cancelled",
    datebooked: "18, Oct 2024",
    standbyVenue:"w-bar",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
  {
    id: "bhqecj4p",
    ContactName:'Jogn Bosco',
    amount: 721,
    status: "completed",
    datebooked: "18, Oct 2024",
    standbyVenue:"bayrock",
    phoneNumber:'09066021425',
    standbyDate :'15, Oct 2024',
  },
];

export const columns = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
  {
    accessorKey: "ContactName",
    header: <div>Contact Name</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ContactName")}</div>
    ),
  },
  {
    accessorKey: "datebooked",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Booked
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("datebooked")}</div>,
  },
  {
    accessorKey: "standbyDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            <div>
          Standby Date & Time
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("standbyDate")}</div>,
  },
  {
    accessorKey: "standbyVenue",
    header: "standbyVenue",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("standbyVenue")}</div>
    ),
  },

  {
    accessorKey: "amount",
    header: ({column}) => <div className="text-right">
         <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div>
        Amount
        </div>
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a naira amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "phoneNumber",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            <div>
          Status
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>  <div className="lowercase"><Status row={row.getValue("status")} /></div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
        <span className=" flex py-5 px-4 justify-between">
                    <div className="flex items-center gap-2">
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="52" height="52" rx="8.66667" fill="#F8F4FE"/>
                    <g clip-path="url(#clip0_1659_20152)">
                    <path d="M42.2809 24.7758L37.0776 18.7133C36.906 18.5083 36.6916 18.3434 36.4494 18.2303C36.2071 18.1172 35.943 18.0586 35.6757 18.0586H16.9077C16.4229 18.0586 15.9579 18.2512 15.615 18.594C15.2722 18.9369 15.0796 19.4019 15.0796 19.8867V32.6836C15.0796 33.1684 15.2722 33.6334 15.615 33.9763C15.9579 34.3191 16.4229 34.5117 16.9077 34.5117H18.8501C19.0515 35.2982 19.5089 35.9953 20.1502 36.4931C20.7915 36.9909 21.5802 37.2611 22.3921 37.2611C23.2039 37.2611 23.9927 36.9909 24.634 36.4931C25.2753 35.9953 25.7327 35.2982 25.9341 34.5117H31.647C31.8483 35.2982 32.3057 35.9953 32.9471 36.4931C33.5884 36.9909 34.3771 37.2611 35.189 37.2611C36.0008 37.2611 36.7896 36.9909 37.4309 36.4931C38.0722 35.9953 38.5296 35.2982 38.731 34.5117H40.6733C41.1582 34.5117 41.6232 34.3191 41.966 33.9763C42.3089 33.6334 42.5015 33.1684 42.5015 32.6836V25.3711C42.5014 25.1527 42.4232 24.9415 42.2809 24.7758ZM16.9077 24.457V19.8867H23.3062V24.457H16.9077ZM22.3921 35.4258C22.0305 35.4258 21.6771 35.3186 21.3764 35.1177C21.0758 34.9168 20.8415 34.6313 20.7031 34.2973C20.5648 33.9632 20.5286 33.5956 20.5991 33.241C20.6696 32.8864 20.8437 32.5606 21.0994 32.305C21.3551 32.0493 21.6808 31.8752 22.0354 31.8047C22.3901 31.7341 22.7576 31.7703 23.0917 31.9087C23.4257 32.0471 23.7112 32.2814 23.9121 32.582C24.113 32.8826 24.2202 33.2361 24.2202 33.5977C24.2202 34.0825 24.0276 34.5475 23.6848 34.8903C23.3419 35.2332 22.8769 35.4258 22.3921 35.4258ZM31.5327 24.457H25.1343V19.8867H31.5327V24.457ZM35.189 35.4258C34.8274 35.4258 34.4739 35.3186 34.1733 35.1177C33.8727 34.9168 33.6384 34.6313 33.5 34.2973C33.3616 33.9632 33.3254 33.5956 33.396 33.241C33.4665 32.8864 33.6406 32.5606 33.8963 32.305C34.152 32.0493 34.4777 31.8752 34.8323 31.8047C35.1869 31.7341 35.5545 31.7703 35.8886 31.9087C36.2226 32.0471 36.5081 32.2814 36.709 32.582C36.9099 32.8826 37.0171 33.2361 37.0171 33.5977C37.0171 34.0825 36.8245 34.5475 36.4816 34.8903C36.1388 35.2332 35.6738 35.4258 35.189 35.4258ZM33.3608 24.457V19.8867H35.6757L39.5982 24.457H33.3608Z" fill="#6D09F9"/>
                    <path d="M42.2809 24.7758L37.0776 18.7133C36.906 18.5083 36.6916 18.3434 36.4494 18.2303C36.2071 18.1172 35.943 18.0586 35.6757 18.0586H16.9077C16.4229 18.0586 15.9579 18.2512 15.615 18.594C15.2722 18.9369 15.0796 19.4019 15.0796 19.8867V32.6836C15.0796 33.1684 15.2722 33.6334 15.615 33.9763C15.9579 34.3191 16.4229 34.5117 16.9077 34.5117H18.8501C19.0515 35.2982 19.5089 35.9953 20.1502 36.4931C20.7915 36.9909 21.5802 37.2611 22.3921 37.2611C23.2039 37.2611 23.9927 36.9909 24.634 36.4931C25.2753 35.9953 25.7327 35.2982 25.9341 34.5117H31.647C31.8483 35.2982 32.3057 35.9953 32.9471 36.4931C33.5884 36.9909 34.3771 37.2611 35.189 37.2611C36.0008 37.2611 36.7896 36.9909 37.4309 36.4931C38.0722 35.9953 38.5296 35.2982 38.731 34.5117H40.6733C41.1582 34.5117 41.6232 34.3191 41.966 33.9763C42.3089 33.6334 42.5015 33.1684 42.5015 32.6836V25.3711C42.5014 25.1527 42.4232 24.9415 42.2809 24.7758ZM16.9077 24.457V19.8867H23.3062V24.457H16.9077ZM22.3921 35.4258C22.0305 35.4258 21.6771 35.3186 21.3764 35.1177C21.0758 34.9168 20.8415 34.6313 20.7031 34.2973C20.5648 33.9632 20.5286 33.5956 20.5991 33.241C20.6696 32.8864 20.8437 32.5606 21.0994 32.305C21.3551 32.0493 21.6808 31.8752 22.0354 31.8047C22.3901 31.7341 22.7576 31.7703 23.0917 31.9087C23.4257 32.0471 23.7112 32.2814 23.9121 32.582C24.113 32.8826 24.2202 33.2361 24.2202 33.5977C24.2202 34.0825 24.0276 34.5475 23.6848 34.8903C23.3419 35.2332 22.8769 35.4258 22.3921 35.4258ZM31.5327 24.457H25.1343V19.8867H31.5327V24.457ZM35.189 35.4258C34.8274 35.4258 34.4739 35.3186 34.1733 35.1177C33.8727 34.9168 33.6384 34.6313 33.5 34.2973C33.3616 33.9632 33.3254 33.5956 33.396 33.241C33.4665 32.8864 33.6406 32.5606 33.8963 32.305C34.152 32.0493 34.4777 31.8752 34.8323 31.8047C35.1869 31.7341 35.5545 31.7703 35.8886 31.9087C36.2226 32.0471 36.5081 32.2814 36.709 32.582C36.9099 32.8826 37.0171 33.2361 37.0171 33.5977C37.0171 34.0825 36.8245 34.5475 36.4816 34.8903C36.1388 35.2332 35.6738 35.4258 35.189 35.4258ZM33.3608 24.457V19.8867H35.6757L39.5982 24.457H33.3608Z" fill="url(#pattern0_1659_20152)"/>
                    </g>
                    <defs>
                    <pattern id="pattern0_1659_20152" patternContentUnits="objectBoundingBox" width="5.92593" height="1.52324">
                    <use xlink:href="#image0_1659_20152" transform="scale(0.0296296 0.0423122)"/>
                    </pattern>
                    <clipPath id="clip0_1659_20152">
                    <rect width="29.25" height="29.25" fill="white" transform="translate(13.2515 11.6602)"/>
                    </clipPath>
                    <image id="image0_1659_20152" width="200" height="36" xlink:href="data:image/png;base64,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"/>
                    </defs>
                    </svg>

                    <p className="text-[#1F1D21] font-brbold text-2xl">StandBy Bookings</p>

                    </div>
                    <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <p className="font-brmedium text-sm text-[#1F1D21]">Filter</p>
                        
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_1659_19193"  maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                        <rect width="18" height="18" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1659_19193)">
                        <path d="M7.5 13.5V12H10.5V13.5H7.5ZM4.5 9.75V8.25H13.5V9.75H4.5ZM2.25 6V4.5H15.75V6H2.25Z" fill="#1F1D21"/>
                        </g>
                        </svg>

                        </div>
                        <div className="bg-[#F5F4F6] flex items-center rounded-mm gap-1 py-1 px-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7141 11.786L10.117 9.18779C10.8957 8.17305 11.2592 6.9001 11.1339 5.62717C11.0086 4.35423 10.4037 3.17663 9.44206 2.33325C8.48041 1.48987 7.23395 1.04387 5.95555 1.08571C4.67714 1.12755 3.46252 1.6541 2.55806 2.55855C1.65361 3.463 1.12706 4.67763 1.08522 5.95604C1.04338 7.23444 1.48939 8.4809 2.33277 9.44255C3.17615 10.4042 4.35374 11.0091 5.62668 11.1344C6.89961 11.2597 8.17256 10.8962 9.1873 10.1175L11.7866 12.7173C11.8476 12.7784 11.9201 12.8268 11.9999 12.8598C12.0796 12.8929 12.1651 12.9099 12.2514 12.9099C12.3378 12.9099 12.4233 12.8929 12.503 12.8598C12.5828 12.8268 12.6552 12.7784 12.7163 12.7173C12.7773 12.6563 12.8258 12.5838 12.8588 12.5041C12.8918 12.4243 12.9088 12.3388 12.9088 12.2525C12.9088 12.1661 12.8918 12.0807 12.8588 12.0009C12.8258 11.9211 12.7773 11.8487 12.7163 11.7876L12.7141 11.786ZM2.40605 6.12529C2.40605 5.38979 2.62415 4.67081 3.03278 4.05926C3.4414 3.44772 4.02219 2.97108 4.7017 2.68961C5.38121 2.40815 6.12893 2.33451 6.8503 2.478C7.57166 2.62148 8.23428 2.97566 8.75436 3.49574C9.27443 4.01581 9.62861 4.67843 9.7721 5.3998C9.91559 6.12117 9.84194 6.86888 9.56048 7.5484C9.27902 8.22791 8.80237 8.8087 8.19083 9.21732C7.57928 9.62594 6.8603 9.84404 6.1248 9.84404C5.13884 9.84303 4.19355 9.45091 3.49637 8.75373C2.79919 8.05654 2.40707 7.11125 2.40605 6.12529Z" fill="#4A464E"/>
                        </svg>
                        <input 
                        type="text"
                        placeholder="Search"
                        value={(table.getColumn("ContactName")?.getFilterValue() || "")}
                        onChange={(event) =>
                            table.getColumn("ContactName")?.setFilterValue(event.target.value)
                        }
                        className="outline-none bg-[#F5F4F6] text-sm placeholder:text-[#868388] font-brreg" 
                        />

                        </div>
                    </div>
                </span>
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("ContactName")?.getFilterValue() || "")}
          onChange={(event) =>
            table.getColumn("ContactName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
