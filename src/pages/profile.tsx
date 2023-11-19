import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { offChainAttest } from "@/lib/eas";
import { walletClientToSigner } from "@/lib/eas-wagmi-utils";
import useStore from "@/lib/store";
import { UploadButton } from "@/lib/uploadthing";
import { getStoredProfile, userDataConformance } from "@/lib/userUtils";
import { postUserData } from "@/lib/wakunet/waku";
import { zodResolver } from "@hookform/resolvers/zod";
import { LightNode } from "@waku/sdk";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWalletClient,
} from "wagmi";
import { z } from "zod";
import { UserProfile } from "../types/alltypes";
import { abi } from "../lib/abi";

// TODO: Integrate attestation
// - Connect Wallet WalletConnect + Metamask
// - Create new interest with EAS
// - Save the interest as option on UI
// - Submit Waku my interests
// - On Connect page. On match, exchange and verify attestation.
// - Open Chat 1 to 1.

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string(),
  img: z.string(),
  // airplane: z.boolean(),
  context: z.string(),
  interests: z.array(z.string()),
});

const ProfilePage = ({ wakuNode }: { wakuNode: LightNode }) => {
  const { context, setContext, interests, setInterests } = useStore();

  const [profile, setProfile] = useState<UserProfile>(getStoredProfile());
  const { address } = useAccount();
  const { data } = useContractRead({
    address: address,
    abi: abi,
    functionName: "status",
    args: ["0xA0Cf798816D4b9b9866b5330EEa46a18382f251e"],
  });

  const { write } = useContractWrite({
    address: "0x2e0bB37BE1987a123e9F4290eB8a3ed377F52664",
    abi: abi,
    functionName: "updateStatus",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: profile || {
      name: "",
      bio: "",
      img: "",
      interests: [],
      // airplane: false,
      context: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values:", values);
    const updatedProfile = userDataConformance(values);
    setProfile(updatedProfile);
    console.log("Profile:", updatedProfile);
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    await postUserData(wakuNode, updatedProfile);
  }

  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
        {data ? `My Status: ${data}` : ""}
        {/* <div>
          <Input />
          <Button onClick={() => write({ args: ["Sunny"] })}>Update</Button>
        </div> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
            {/* <FormField
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
            /> */}
            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <div className="mb-4 flex flex-row justify-between">
                    <FormLabel className="text-base">Interests</FormLabel>
                    <EASInterests userAddress={address} />
                  </div>
                  {interests.map((item) => (
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
                                checked={field.value?.includes(item.name)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.name,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.name,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
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
            <div className="flex flex-row gap-2">
              <Button type="submit">Submit</Button>
              <Button
                onClick={() => {
                  form.reset();
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
};

export default ProfilePage;

const EASInterests = ({ userAddress }: { userAddress: string | undefined }) => {
  const [toggleDialog, setToggleDialog] = useState(false);
  const [currentInterest, setCurrentInterest] = useState("");
  const { context, setContext, interests, setInterests } = useStore();
  // const signer = useSigner();
  const { data: walletClient, isError, isLoading } = useWalletClient();

  const attest = async () => {
    if (walletClient) {
      const etherSigner = await walletClientToSigner(walletClient);

      const signedOffAttestation = await offChainAttest(
        etherSigner,
        currentInterest,
        userAddress || "0x123",
      );
      console.log(
        "🚀 ~ file: profile.tsx:283 ~ onClick={ ~ signedOffAttestation:",
        signedOffAttestation,
      );
      setInterests([
        ...interests,
        { id: signedOffAttestation.uid, name: currentInterest },
      ]);

      setToggleDialog(!toggleDialog);
    }
  };

  return (
    <>
      <Dialog open={toggleDialog}>
        <DialogTrigger asChild>
          <PlusCircle onClick={() => setToggleDialog(!toggleDialog)} />
        </DialogTrigger>
        <DialogContent className="w-[400px] sm:w-[540px]">
          <DialogHeader>
            <DialogTitle>What are your interests?</DialogTitle>
            <DialogDescription>
              Add below to attest your interest.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Interest
              </Label>
              <Input
                id="name"
                value={currentInterest}
                onChange={async (e) => {
                  setCurrentInterest(e.target.value);
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                await attest();
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
