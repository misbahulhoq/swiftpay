import { JSX } from "react";
import { Slug } from "@/app/(protected)/[slug]/page";

import AddMoney from "./pages/add-money";
import BankToSwiftpay from "./pages/bank-to-swiftpay";
import BillPay from "./pages/bill-pay";
import SwiftpayToBank from "./pages/swiftpay-to-bank";
import CashOut from "./pages/cash-out";
import ElectricityBill from "./pages/bill-pay/electricity-bill";
import GasBill from "./pages/bill-pay/gas-bill";
import WaterBill from "./pages/bill-pay/water-bill";
import InternetBill from "./pages/bill-pay/internet-bill";
import TelephoneBill from "./pages/bill-pay/telephone-bill";
import TvBill from "./pages/bill-pay/tv-bill";
import CreditCardBill from "./pages/bill-pay/credit-card-bill";
import EducationFee from "./pages/bill-pay/education-fee";
import LimitCharges from "./pages/limit-charges";
import MerchantPay from "./pages/merchant-pay";
import MobileRecharge from "./pages/mobile-recharge";
import NearbyAgents from "./pages/nearby-agents";
import RequestMoney from "./pages/request-money";
import SavedRecipients from "./pages/saved-recipients";
import SendMoney from "./pages/send-money";
import Offers from "./pages/offers";
import Profile from "./pages/profile";
import Scan from "./pages/scan";
import Security from "./pages/security";
import Services from "./pages/services";
import Statements from "./pages/statements";
import Support from "./pages/support";
import CardToSwiftpay from "./pages/card-to-swiftpay";

export const componentMap: Record<Slug, JSX.Element> = {
  "add-money": <AddMoney />,
  "bank-to-swiftpay": <BankToSwiftpay />,
  "bill-pay": <BillPay />,
  "swiftpay-to-bank": <SwiftpayToBank />,
  "cash-out": <CashOut />,
  "card-to-swiftpay": <CardToSwiftpay />,
  "electricity-bill": <ElectricityBill />,
  "gas-bill": <GasBill />,
  "water-bill": <WaterBill />,
  "internet-bill": <InternetBill />,
  "telephone-bill": <TelephoneBill />,
  "tv-bill": <TvBill />,
  "credit-card-bill": <CreditCardBill />,
  "education-fee": <EducationFee />,
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
