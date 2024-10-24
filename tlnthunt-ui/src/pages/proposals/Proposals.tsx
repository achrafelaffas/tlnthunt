import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReceivedProposals from "./ReceivedProposals";
import SentProposals from "./SentProposals";

const Proposals = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Tabs defaultValue="sent" className="w-full">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="sent">
            <SentProposals />
          </TabsContent>
          <TabsContent value="received">
            <ReceivedProposals />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Proposals;
