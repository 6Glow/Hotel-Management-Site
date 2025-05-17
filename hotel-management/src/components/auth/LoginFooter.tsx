
import React from "react";
import Link from "next/link";

const LoginFooter = () => {
  return (
    <div className="text-sm text-center">
      Нет аккаунта?{" "}
      <Link href="/register" className="text-primary hover:underline">
        Создать
      </Link>
    </div>
  );
};

export default LoginFooter;
