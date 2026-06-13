import { JSX } from "react";
import { paths } from "@/app/(protected)/[slug]/page";

import AddMoney from "./pages/add-money";
import BankToBkash from "./pages/bank-to-bkash";
import BillPay from "./pages/bill-pay";
import BkashToBank from "./pages/bkash-to-bank";
import CashOut from "./pages/cash-out";
import ElectricityBill from "./pages/electricity-bill";
import LimitCharges from "./pages/limit-charges";
import MerchantPay from "./pages/merchant-pay";
import MobileRecharge from "./pages/mobile-recharge";
import NearbyAgents from "./pages/nearby-agents";
import RequestMoney from "./pages/request-money";
import SavedRecipients from "./pages/saved-recepients";
import SendMoney from "./pages/send-money";
import Offers from "./pages/offers";
import Profile from "./pages/profile";
import Scan from "./pages/scan";
import Security from "./pages/security";
import Services from "./pages/services";
import Statements from "./pages/statements";
import Support from "./pages/support";

type Slug = (typeof paths)[number]["slug"];

export const componentMap: Record<Slug, JSX.Element> = {
  "add-money": <AddMoney />,
  "bank-to-bkash": <BankToBkash />,
  "bill-pay": <BillPay />,
  "bkash-to-bank": <BkashToBank />,
  "cash-out": <CashOut />,
  "electricity-bill": <ElectricityBill />,
  "limits-charges": <LimitCharges />,
  "merchant-pay": <MerchantPay />,
  "mobile-recharge": <MobileRecharge />,
  "nearby-agents": <NearbyAgents />,
  "request-money": <RequestMoney />,
  "saved-recipients": <SavedRecipients />,
  "send-money": <SendMoney />,
  offers: <Offers />,
  profile: <Profile />,
  scan: <Scan />,
  security: <Security />,
  services: <Services />,
  statements: <Statements />,
  support: <Support />,
  transactions: <Statements />,
};
