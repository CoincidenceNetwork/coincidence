import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useStore from "@/lib/store";
import { UploadButton } from "@/lib/uploadthing";
import { postUserData } from "@/lib/wakunet/waku";
import { zodResolver } from "@hookform/resolvers/zod";
import { LightNode } from "@waku/sdk";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UserProfile } from "../types/alltypes";
import { userDataConformance } from "@/lib/userUtils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string(),
  img: z.string(),
  airplane: z.boolean(),
  context: z.string(),
  interests: z.array(z.string()),
});

// export interface ProfileData {
//   name: string;
//   bio: string;
//   img: string;
//   context: string;
//   interests: string[];
// }

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const ProfilePage = ({ wakuNode }: { wakuNode: LightNode }) => {
  const { context, setContext } = useStore();

  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const storedProfile = localStorage.getItem("userProfile");
    return storedProfile
      ? (JSON.parse(storedProfile) as UserProfile)
      : {
          name: "",
          bio: "",
          img: "",
          interests: [],
          context: "",
        };
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: profile || {
      name: "",
      bio: "",
      img: "",
      interests: [],
      airplane: false,
      context: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setProfile(profile);
    await postUserData(wakuNode, userDataConformance(values));
  }

  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder={profile?.name || ""} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea placeholder={profile?.bio || ""} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                form.setValue(
                  "img",
                  res[0]?.url ? res[0].url : profile?.img || "",
                );
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
            <FormField
              control={form.control}
              name="airplane"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel className="text-base">Airplane Mode</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Interests</FormLabel>
                    <FormDescription>
                      Select the items you want to display in the sidebar.
                    </FormDescription>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="interests"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default ProfilePage;
