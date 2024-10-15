import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";

export const setToken = (token) => {
  if (!token) return;

  setCookie({ token }, "jwt", token.data.jwt, {
    httpOnly: false,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  setCookie({ token }, "user", JSON.stringify(token.data.user), {
    httpOnly: false,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const logOut = async (ctx) => {
  destroyCookie(ctx, "jwt");
  destroyCookie(ctx, "user");

  Router.replace("/");
};
