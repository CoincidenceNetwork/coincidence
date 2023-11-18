import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

const ProfilePage = () => {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
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
            <Button className="p-2">
              <PlusCircle />
            </Button>
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
            <Button className="p-2">
              <PlusCircle />
            </Button>
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
      </main>
    </>
  );
};

export default ProfilePage;
