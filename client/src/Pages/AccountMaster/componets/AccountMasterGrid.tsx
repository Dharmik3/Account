import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { AccountActionCell } from "../../../cells";
import { useGetAccountMaster } from "../../../hooks/useGetAccountMaster";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "accountName", headerName: "Account name", width: 300 },
  { field: "accountType", headerName: "Account Type", width: 200 },
  {
    field: "openingBalance",
    headerName: "Opening Balance",
    type: "number",
    width: 140,
    renderCell: (props) => (props.value ? props.value : "—"),
  },
  {
    field: "balanceType",
    headerName: "Balance Type",
    sortable: false,
    width: 150,
  },
  {
    headerName: "Actions",
    field: "action",
    width: 200,
    renderCell: (props) => <AccountActionCell data={props.row} />,
  },
];

export default function AccountMasterGrid() {
  const { data, isLoading } = useGetAccountMaster();
  const tableData = data?.pages[0].data;

  return (
    <Box style={{ height: "auto", width: "100%" }} mt={2}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={(rows) => rows.accountName}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          rowSelection={false}
          showCellVerticalBorder
          showColumnVerticalBorder
        />
      )}
    </Box>
  );
}
