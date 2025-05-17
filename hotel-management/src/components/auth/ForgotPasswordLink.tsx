
import React from "react";
import Link from "next/link";

const ForgotPasswordLink = () => {
  return (
    <Link
      href="/forgot-password"
      className="text-sm text-primary hover:underline"
    >
      Забыли пароль?
    </Link>
  );
};

export default ForgotPasswordLink;
