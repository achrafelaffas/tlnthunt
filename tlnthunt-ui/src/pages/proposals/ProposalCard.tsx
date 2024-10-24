import { ProposalResponse } from "@/api";
import { Link } from "react-router-dom";

const ProposalCard = ({ proposal }: { proposal: ProposalResponse }) => {
  return (
    <div className="w-full gap-3 p-5 flex flex-row justify-between border rounded-lg items-center">
      <div>
        <h1 className="">New Proposal</h1>
        <Link
          to={`/proposals/${proposal.id}/details`}
          className="hover:underline text-primary"
        >
          <p>{proposal.project?.title}</p>
        </Link>
      </div>
      <small>{new Date(proposal.created!).toDateString()}</small>
    </div>
  );
};

export default ProposalCard;
