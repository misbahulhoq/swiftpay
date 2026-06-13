"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { bankList } from "@/lib/bank-list";
import { Cross, Search, XIcon } from "lucide-react";

const BankToBkash = () => {
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState(false);

  return (
    <div>
      <section>
        <InputGroup className="">
          <InputGroupInput
            placeholder="Search..."
            className=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          {search.length > 0 && (
            <InputGroupAddon align="inline-end">
              <button onClick={() => setSearch("")} className="pr-1">
                <XIcon size={18} />
              </button>
            </InputGroupAddon>
          )}
        </InputGroup>
      </section>

      <section className="mt-3">
        {bankList
          .filter(
            (bank) =>
              bank.name.toLowerCase().includes(search.toLowerCase()) ||
              bank.shortName.toLowerCase().includes(search.toLowerCase()),
          )
          .map((bank, index) => {
            const { shortName, name } = bank;
            return (
              <button
                key={index}
                className="my-1.5 block cursor-pointer py-2.5"
              >
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
