import {
  ProposalRequest,
  ProposalRequestPeriodEnum as Period,
  ProposalApi,
  ProjectApi,
  ProjectResponse,
} from "@/api";
import Tiptap from "@/components/TipTap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuthConfig from "@/hooks/useAuthConfig";
import { capitalizeFirstLetter } from "@/lib/utils";
import { proposalResquestSchema } from "@/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, Clock10, Tag, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const SendProposal = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectResponse>({});
  const config = useAuthConfig();
  const proposalApi = new ProposalApi(config);
  const projectApi = new ProjectApi(config);
  const form = useForm<ProposalRequest>({
    resolver: zodResolver(proposalResquestSchema),
    defaultValues: {
      period: Period.OneMonth,
      price: 0,
      coverLetter: "",
    },
  });

  const fecthProject = async (id: number) => {
    await projectApi.getProjectById(id).then(
      (res) => setProject(res.data),
      (e) => Error(e)
    );
  };

  useEffect(() => {
    if (id) fecthProject(Number(id));
  });

  const submit = async (request: ProposalRequest) => {
    if (project.id) request.projectId = project.id;
    await proposalApi.createProposal(request).catch((e) => Error(e));
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="flex w-full md:w-1/2 lg:w-2/3 items-center justify-center">
        <Card className="p-7 w-full dark:bg-transparent border-0">
          <CardTitle className="mb-3">Send Proposal</CardTitle>
          <CardDescription className="my-2">
            Provide details about your propsal. Click send when you're done.
          </CardDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="w-full space-y-6"
            >
              <div className="flex w-full gap-3 md:flex-row flex-col">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2">
                      <FormLabel>Proposal Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="$50.00 - $10,000.00"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The price is from $50.00 to $10,000.00.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2">
                      <FormLabel>Period</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={Period.LessThanAMonth}>
                              Less than a month
                            </SelectItem>
                            <SelectItem value={Period.OneMonth}>
                              A month
                            </SelectItem>
                            <SelectItem value={Period.MoreThanThreeMonths}>
                              More than three months
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Select the project approximate duration.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter</FormLabel>
                    <FormControl>
                      <Card className="bg-transparent border-primary">
                        <Tiptap
                          description={field.value}
                          onChange={field.onChange}
                        />
                      </Card>
                    </FormControl>
                    <FormDescription>
                      Describe you proposal in details. Use the tools bar to
                      apply styles to you text.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Send your proposal
              </Button>
            </form>
          </Form>
        </Card>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3">
        <Card className="p-5">
          <CardTitle>{project.title}</CardTitle>
          <CardDescription className="mt-2">
            {project.customer?.name}
          </CardDescription>

          <CardContent className="flex flex-col mt-5 p-0 gap-3">
            <div className="flex items-center justify-between">
              <p className="flex gap-2 items-center">
                <Clock10 className="h-4 w-4" />
                Posted
              </p>
              {project.posted && (
                <p className="text-primary">
                  {new Date(project.posted).toDateString()}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="flex gap-2 items-center">
                <BriefcaseBusiness className="h-4 w-4" />
                Experince
              </p>
              {project.level && (
                <p className="text-primary">
                  {capitalizeFirstLetter(project.level)}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="flex gap-2 items-center">
                <Timer className="h-4 w-4" />
                Time
              </p>
              {project.period && (
                <p className="text-primary">
                  {capitalizeFirstLetter(project.period.replace("_", " "))}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="flex gap-2 items-center">
                <Tag className="h-4 w-4" />
                Price
              </p>
              {project.period && (
                <p className="text-primary">${project.price}.00</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SendProposal;
