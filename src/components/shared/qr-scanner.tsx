import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const QrScanner = ({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");

    const qrCodeSuccessCallback = (
      _decodedText: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      decodedResult: any,
    ) => {
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

    const startScanner = () => {
      Html5Qrcode.getCameras()
        .then((cameras) => {
          if (cameras && cameras.length) {
            html5QrCode
              .start(
                { facingMode: "environment" },
                config,
                qrCodeSuccessCallback,
                () => {},
              )
              .catch((err) => {
                console.log("Error starting scanner:", err);
                toast.error("Unable to start the QR scanner.", {
                  position: "top-center",
                });
                onCancel();
              });
          } else {
            toast.error("No cameras found on this device.", {
              position: "top-center",
            });
            onCancel();
          }
        })
        .catch((err) => {
          console.log("Camera permission error:", err);
          toast.error(
            "Camera permission is required. Please allow camera access in your browser settings.",
            { position: "top-center", duration: 5000 },
          );
          onCancel();
        });
    };

    startScanner();

    return () => {
      const stopScanner = async () => {
        try {
          if (html5QrCode.isScanning) {
            await html5QrCode.stop();
            console.log("QR Code scanning stopped.");
          }
        } catch (err) {
          console.error("Failed to stop scanner gracefully:", err);
        }
      };
      stopScanner();
    };
  }, [onSuccess, onCancel]);

  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div
        id="reader"
        className="w-full max-w-sm rounded-lg bg-white p-4"
      ></div>
      <Button onClick={onCancel} className="mt-4" variant="secondary">
        Cancel
      </Button>
    </div>
  );
};

export default QrScanner;
