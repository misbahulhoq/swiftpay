"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { bankList } from "@/lib/bank-list";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const BankToBkash = () => {
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState(false);

  return (
    <div>
      <section>
        <InputGroup className="">
          <InputGroupInput placeholder="Search..." className="" />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Button>Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </section>

      <section className="mt-3">
        {bankList.map((bank, index) => {
          const { shortName, name } = bank;
          return (
            <button key={index} className="my-1.5 block cursor-pointer py-2.5">
              <p className="text-muted-foreground">
                {name} ({shortName})
              </p>
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default BankToBkash;
