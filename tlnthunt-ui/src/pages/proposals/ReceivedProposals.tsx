import { ProposalApi, ProposalResponse } from "@/api";
import useAuthConfig from "@/hooks/useAuthConfig";
import { useEffect, useState } from "react";
import { columns } from "./Columns";
import DataTable from "@/components/DataTable";
import { Card } from "@/components/ui/card";

const ReceivedProposals = () => {
  const config = useAuthConfig();
  const proposalApi = new ProposalApi(config);
  const [proposals, setProposals] = useState<ProposalResponse[]>([]);

  const fecthProposals = async () => {
    await proposalApi.getReceivedProposals().then(
      (response) => setProposals(response.data),
      (error) => Error(error)
    );
  };

  useEffect(() => {
    fecthProposals();
  }, []);

  return (
    <Card className="p-4 dark:bg-black dark:border-0">
      <DataTable columns={columns} data={proposals} isloading={false} />
    </Card>
  );
};

export default ReceivedProposals;
