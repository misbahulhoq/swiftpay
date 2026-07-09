"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { QrCode } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";

interface IForm {
  merchantNumber: string;
  amount: number;
}

const QrScanner = ({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");

    const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
      if (decodedResult.result.format.formatName === "QR_CODE") {
        onSuccess();
      } else {
        toast.error("Not a QR Code. Please scan a valid QR Code.", {
          position: "top-center",
        });
      }
      html5QrCode
        .stop()
        .catch((err) => console.error("Failed to stop scanner", err));
    };

    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode
      .start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        () => {},
      )
      .catch((err) => {
        toast.error("Failed to start camera. Please check permissions.", {
          position: "top-center",
        });
        onCancel();
      });

    return () => {
      const stopScanner = async () => {
        try {
          if (html5QrCode.isScanning) {
            await html5QrCode.stop();
          }
        } catch (err) {
          console.log("Scanner already stopped or failed to stop gracefully.");
        }
      };
      stopScanner();
    };
  }, [onSuccess, onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75">
      <div id="reader" className="w-full max-w-sm rounded-lg bg-white p-4"></div>
      <Button onClick={onCancel} className="mt-4" variant="secondary">
        Cancel
      </Button>
    </div>
  );
};

const MerchantPay = () => {
  const { balanceOut } = useTransactions();
  const [showScanner, setShowScanner] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IForm>();

  const handleMerchantPay = (data: IForm) => {
    try {
      balanceOut("merchant-pay", data.amount);
      toast.success(
        `Paid ৳${data.amount} to merchant ${data.merchantNumber} successfully`,
        {
          position: "bottom-center",
        },
      );
      reset();
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong", {
        position: "top-center",
      });
    }
  };

  const handleScanSuccess = () => {
    const hardcodedMerchantNumber = "01812345678";
    setValue("merchantNumber", hardcodedMerchantNumber, {
      shouldValidate: true,
    });
    setShowScanner(false);
    toast.success("Merchant number captured from QR code.", {
      position: "top-center",
    });
  };

  const handleScanCancel = () => {
    setShowScanner(false);
  };

  return (
    <div className="relative">
      {showScanner && (
        <QrScanner
          onSuccess={handleScanSuccess}
          onCancel={handleScanCancel}
        />
      )}
      <div className="absolute top-0 right-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowScanner(true)}
        >
          <QrCode className="h-6 w-6" />
        </Button>
      </div>
      <h2 className="text-muted-foreground mb-3 text-lg">
        Enter merchant&apos;s number and amount
      </h2>
      <form
        onSubmit={handleSubmit(handleMerchantPay)}
        className="flex flex-col gap-3"
      >
        <div>
          <Input
            autoComplete="off"
            placeholder="Merchant's number"
            className="h-11"
            {...register("merchantNumber", {
              required: "Merchant's number is required",
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: "Invalid Bangladeshi number format",
              },
            })}
          />
          {errors.merchantNumber && (
            <span className="text-destructive text-xs">
              {errors.merchantNumber.message}
            </span>
          )}
        </div>

        <div>
          <Input
            placeholder="৳ Amount"
            type="number"
            className="h-11"
            min={1}
            {...register("amount", {
              required: "Amount is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Minimum amount is ৳1",
              },
            })}
          />
          {errors.amount && (
            <span className="text-destructive text-xs">
              {errors.amount.message}
            </span>
          )}
        </div>

        <Button type="submit" className="h-11 w-25 self-end rounded-full">
          Pay
        </Button>
      </form>
    </div>
  );
};

export default MerchantPay;