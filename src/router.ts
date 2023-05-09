import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import RessourceView from "@/views/Ressource.vue";
import useAuthStore from "@/stores/authStore";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/ressource/:id",
    component: RessourceView,
    name: "Ressource",
  },
  {
    path: "/a-propos",
    component: () => import("@/views/About.vue"),
    name: "About",
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    name: "Login",
  },
  {
    path: "/admin",
    component: () => import("@/views/Admin.vue"),
    name: "Admin",
    meta: { needAuth: true },
    children: [
      {
        path: "management",
        component: () => import("@/views/admin/Management.vue"),
        name: "Management",
      },
      {
        path: "validation",
        component: () => import("@/views/admin/Validation.vue"),
        name: "Validation",
      },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const isProtected = to.matched.some((route) => route.meta.needAuth);

  const isAuthenticated = authStore.user.accessToken || false;

  if (isProtected && !isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
