import { MapPin } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Agent {
  id: string;
  name: string;
  address: string;
  distance: string;
}

const fakeAgents: Agent[] = [
  {
    id: "1",
    name: "Rahim Store",
    address: "123, Gulshan Avenue, Dhaka",
    distance: "0.5 km away",
  },
  {
    id: "2",
    name: "Karim General Store",
    address: "45, Banani Road 11, Dhaka",
    distance: "1.2 km away",
  },
  {
    id: "3",
    name: "ABC Communication",
    address: "789, Mirpur 10, Dhaka",
    distance: "2.1 km away",
  },
  {
    id: "4",
    name: "Mayer Doa Enterprise",
    address: "10, Dhanmondi 32, Dhaka",
    distance: "3.5 km away",
  },
  {
    id: "5",
    name: "Bismillah Mobile Point",
    address: "221/B, Elephant Road, Dhaka",
    distance: "4.0 km away",
  },
  {
    id: "6",
    name: "New Market Agent Point",
    address: "Shop 5, New Market, Dhaka",
    distance: "4.8 km away",
  },
];

const NearbyAgents = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Nearby SwiftPay Agents</h2>
      <div className="flex flex-col gap-4">
        {fakeAgents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle>{agent.name}</CardTitle>
                  <CardDescription>{agent.address}</CardDescription>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                  <MapPin className="h-4 w-4" />
                  <span>{agent.distance}</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NearbyAgents;