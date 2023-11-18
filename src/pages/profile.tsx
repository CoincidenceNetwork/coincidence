import Header from "@/components/header";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LightNode, createLightNode } from "@waku/sdk";
import React, { useEffect, useState } from "react";
import { createNode, postUserData } from "../lib/wakunet/waku";
import { UserDataMessage } from "@/types/alltypes";
export interface ProfileData {
  name: string;
  bio: string;
  img: string;
  context: string;
  interests: string[];
}
const ProfilePage = (wakuNode: LightNode) => {
  const { context, setContext } = useStore();

  // TBD for the form inputs?
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [img, setImg] = useState("");
  const [interests, setInterests] = useState([]);
  const handleSubmit = (node: LightNode, event: any) => {
    event.preventDefault();
    const profileData = { name, bio, img, context, interests };
    handleProfileSend(node, profileData);
  };
  // form function, also saves context to localstorage
  async function handleProfileSend(node: LightNode, profileData: ProfileData) {
    const context = profileData.context;
    // localStorage.setItem("context", context); TBD
    const userData: UserDataMessage = {
      name: profileData.name,
      bio: profileData.bio,
      img: profileData.img,
      interests: profileData.interests,
    };
    postUserData(node, userData);
  }

  return (
    // TODO make this a form
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="vitalik" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="vitalik" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="airpline"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Marketing emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        {/* Section 1 */}
        <div className="flex ">
          <div className="w-2/3">
            <h2 className="text-xl font-bold">Vitalik</h2>
            <div className="mt-4 flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
          </div>
          <div className="flex w-1/3 justify-end">
            <div className="h-16 w-16 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="mt-6">
          <h2 className="text-xl font-bold">Bio</h2>
          <Textarea className="mt-2 h-32 w-full rounded border border-gray-300 p-2"></Textarea>
        </div>

        {/* Section 3 */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Contexts</h2>
            <button className="p-2">
              <PlusCircle />
            </button>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">ETH GLOBAL Istanbul 2023</Label>
          </div>
        </div>

        {/* Section 4 */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Interests</h2>
            <Sheet>
              <SheetTrigger className="p-2">
                <PlusCircle />
              </SheetTrigger>
              <SheetContent side={"bottom"}>
                <SheetHeader>
                  <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Switch />
            <Label htmlFor="airplane-mode">Network State</Label>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Switch />
            <Label htmlFor="airplane-mode">Waku</Label>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <Switch />
            <Label htmlFor="airplane-mode">Ethereum Attestation Service</Label>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Switch />
            <Label htmlFor="airplane-mode">Public Good</Label>
          </div>
        </div>
        <div className="mt-6">
          {/* TODO form button not enabled if not connected */}
          <button onClick={handleSubmit} className="p-2">
            Submit
          </button>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
