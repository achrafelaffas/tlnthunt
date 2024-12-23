import { CategoryApi, CategoryDTO, ProjectApi, ProjectRequest } from "@/api";
import Tiptap from "@/components/TipTap";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
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
import { projectRequestSchema } from "@/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ProjectRequestLevelEnum as Level,
  ProjectRequestPeriodEnum as Period,
} from "@/api";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const config = useAuthConfig();
  const projectApi = new ProjectApi(config);
  const categoryApi = new CategoryApi(config);
  const navigate = useNavigate();

  const form = useForm<ProjectRequest>({
    resolver: zodResolver(projectRequestSchema),
    defaultValues: {
      description: "",
      title: "",
      level: Level.Beginner,
      period: Period.LessThanAMonth,
      price: 0,
    },
  });

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const fetchCategories = async () => {
    const categories = await categoryApi.getAllCategories().then(
      (response) => response.data,
      (error) => console.log(error)
    );
    if (categories) setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const submit = async (projectRequest: ProjectRequest) => {
    await projectApi
      .createProject(projectRequest)
      .then(() => navigate("/my-projects"))
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="p-7 w-full bg-transparent border-0">
        <CardTitle className="mb-3">Post a new project</CardTitle>
        <CardDescription className="my-2">
          Provide details about your project. Click post when you're done.
        </CardDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Create an E-commerce website"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be specific and imagine you’re describing a project to
                    another person.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-3 md:flex-row flex-col">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Project Price</FormLabel>
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
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Project category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem value={c.id!.toString()} key={c.id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Select from the diffrent categories we have.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="md:w-1/2">
                    <FormLabel>Expertise Level</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Level.Beginner}>
                            {Level.Beginner}
                          </SelectItem>
                          <SelectItem value={Level.Intermediate}>
                            {Level.Intermediate}
                          </SelectItem>
                          <SelectItem value={Level.Expert}>
                            {Level.Expert}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Select the project experience level.
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
                    <FormLabel>Project Period</FormLabel>
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
                            One month
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Card className="bg-transparent border-primary">
                      <Tiptap
                        description={field.value}
                        onChange={field.onChange}
                      />
                    </Card>
                  </FormControl>
                  <FormDescription>
                    Describe you project in details. Use the tools bar to apply
                    styles to you text.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Post your project
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default NewProject;
