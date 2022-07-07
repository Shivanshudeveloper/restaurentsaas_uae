import React from "react";
import QRCode from "qrcode.react";
import { useAuth } from "../../../hooks/use-auth";

function scanQR() {
  const { user } = useAuth();
  return (
    <div style={{ margin: "auto" }}>
      <QRCode value={`/dashboard/forms/feedback/${user.id}`} />
      <p>Feedback Form </p>
    </div>
  );
}

export default scanQR;
