"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const AddMoney = () => {
  return (
    <div className="flex flex-col items-start space-y-4">
      <Button asChild variant="outline">
        <Link
          href="/bank-to-bkash"
          className="flex items-center gap-2 rounded border"
        >
          Bank to Swiftpay <ArrowRight size={16} />
        </Link>
      </Button>

      <Button asChild variant="outline">
        <Link href="/card-to-bkash" className="flex items-center gap-2">
          Card to SwiftPay <ArrowRight size={16} />
        </Link>
      </Button>
    </div>
  );
};

export default AddMoney;
