import { paths } from "@/paths";
import { NextRequest, NextResponse } from "next/server";
import * as UserCookie from "@/server/cookies/user-cookie";

export async function withAuth(req: NextRequest, isAdminPage: boolean) {
  try {
    const user = await UserCookie.getUser(req);

    let res: NextResponse;
    if (user) {
      res = isAdminPage && !user.admin
        ? NextResponse.redirect(new URL(paths.root, req.nextUrl))
        : NextResponse.next();
    } else {
      res = NextResponse.redirect(new URL(paths.login, req.nextUrl));
    }

    return res;
  } catch (error) {
    // throw new Error(`Couldn't check authentication`);
  }
}

export async function withoutAuth(req: NextRequest) {
  try {
    const user = await UserCookie.getUser(req);

    if (user) return NextResponse.redirect(new URL(paths.root, req.nextUrl));
    if (!user) return NextResponse.next();
  } catch (error) {
    // throw new Error(`Couldn't check authentication`);
  }
}
