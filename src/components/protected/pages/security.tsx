import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, KeyRound, Fingerprint, LogOut } from "lucide-react";

const Security = () => {
  return (
    <div className="space-y-8 p-4">
      <div className="flex items-center space-x-4">
        <Shield className="text-primary h-10 w-10" />
        <div>
          <h1 className="text-2xl font-bold">Security Settings</h1>
          <p className="text-muted-foreground">
            Manage your account&apos;s security settings.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <KeyRound className="h-6 w-6" />
            <CardTitle>Change PIN</CardTitle>
          </div>
          <CardDescription>
            For the security of your account, do not share your PIN with anyone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            You can change your PIN at any time. A strong PIN is a combination
            of numbers and should be at least 5 digits long.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Change PIN</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Fingerprint className="h-6 w-6" />
            <CardTitle>Biometric Login</CardTitle>
          </div>
          <CardDescription>
            Enable or disable biometric login for a faster and more secure login
            experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p>Enable Biometric Login</p>
            {/* Add a switch component here when available */}
            <Button variant="outline">Toggle</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <LogOut className="h-6 w-6" />
            <CardTitle>Active Sessions</CardTitle>
          </div>
          <CardDescription>
            This is a list of devices that have logged into your account. Revoke
            any sessions that you do not recognize.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Chrome on Windows</p>
                <p className="text-muted-foreground text-sm">Current session</p>
              </div>
              <Button variant="destructive" size="sm">
                Revoke
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Safari on iPhone</p>
                <p className="text-muted-foreground text-sm">2 days ago</p>
              </div>
              <Button variant="destructive" size="sm">
                Revoke
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Log Out From All Devices</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Security;
