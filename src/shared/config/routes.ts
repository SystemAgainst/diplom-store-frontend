export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: (id?: string) => id ? `/profile/${id}` : "/profile/:id",
}

// export enum AppRoutes {
//   HOME = "home",
//   LOGIN = "login",
//   REGISTER = "register",
//   NOT_FOUND = "not_found",
// }
//
// export const RoutePath: Record<AppRoutes, string> = {
//   [AppRoutes.HOME]: "/",
//   [AppRoutes.LOGIN]: "/auth/login",
//   [AppRoutes.REGISTER]: "/auth/register",
//   [AppRoutes.NOT_FOUND]: "*",
// };
