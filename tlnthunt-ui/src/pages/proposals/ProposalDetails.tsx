import {
  ProposalApi,
  ProposalResponse,
  ProposalResponseStatusEnum as Status,
} from "@/api";
import TiptapDisplay from "@/components/TipTapDisplay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAuthConfig from "@/hooks/useAuthConfig";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Clock10, Tag, Timer, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProposalDetails = () => {
  const { id } = useParams();
  const config = useAuthConfig();
  const proposalApi = new ProposalApi(config);
  const [proposal, setProposal] = useState<ProposalResponse>({});

  const updateStatusToRefused = async () => {
    if (proposal.id)
      await proposalApi.updateProposalStatus(proposal.id, Status.Declined);
  };

  const fetchProposalById = async (id: number) => {
    try {
      const response = await proposalApi.getProposalById(id);
      const proposal = response.data;
      setProposal(proposal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) fetchProposalById(Number(id));
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start lg:gap-5">
        <div className="lg:w-2/3 w-full">
          <Card className="p-5 rounded-md mb-3 ld:mb-0">
            <h1 className="lg:text-3xl md:text-xl text-primary text-lg mb-5">
              {proposal.project?.title}
            </h1>
            {proposal.coverLetter && (
              <TiptapDisplay description={proposal.coverLetter} />
            )}
          </Card>
        </div>
        <div className="lg:w-1/3 w-full">
          <Card className="flex flex-col p-5 gap-3">
            <div className="flex flex-row justify-between items-center">
              <h1 className="flex gap-2 items-center">
                <Tag className="h-4 w-4" /> Price
              </h1>
              <h1 className="text-primary">${proposal.price}.00</h1>
            </div>

            <div className="flex flex-row justify-between items-center">
              <h1 className="flex gap-2 items-center">
                <User2 className="h-4 w-4" /> Freelancer
              </h1>
              <h1 className="text-primary">{proposal.freelancer?.name}</h1>
            </div>

            <div className="flex flex-row justify-between items-center">
              <h1 className="flex gap-2 items-center">
                <Clock10 className="h-4 w-4" /> Received
              </h1>
              {proposal.created && (
                <h1 className="text-primary">
                  {new Date(proposal.created).toDateString()}
                </h1>
              )}
            </div>

            <div className="flex flex-row justify-between items-center">
              <h1 className="flex gap-2 items-center">
                <Timer className="h-4 w-4" /> Time
              </h1>
              {proposal.period && (
                <h1 className="text-primary">
                  {capitalizeFirstLetter(proposal.period)}
                </h1>
              )}
            </div>
            <div className="flex gap-3 w-full">
              <Button className="w-1/2">Accept</Button>

              <Button
                className="w-1/2"
                onClick={updateStatusToRefused}
                variant="destructive"
              >
                Refuse
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProposalDetails;
