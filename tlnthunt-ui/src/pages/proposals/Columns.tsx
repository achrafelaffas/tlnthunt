import { ProposalResponse, ProposalResponseStatusEnum as Status } from "@/api";
import DataTableColumnHeader from "@/components/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export const columns: ColumnDef<ProposalResponse>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Id" />;
    },
  },
  {
    accessorKey: "project",
    header: "Project",
    cell({ row }) {
      const title = row.original.project?.title;
      const id = row.original.id;
      return (
        <Link to={`/proposals/${id}/details`} className="hover:underline">
          {title}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell({ row }) {
      const status = row.original.status;
      if (status == Status.Pending)
        return <span className="text-purple-500">{status}</span>;
      if (status == Status.Declined)
        return <span className="text-red-500">{status}</span>;
      if (status == Status.Accepted)
        return <span className="text-green-500">{status}</span>;
    },
  },
];
