import { Outlet } from "react-router-dom";

import HomeLayout from "components/HomeLayout";
import CreateCategory from "components/CreateCategory";
import { useModalStore } from "stores/modal.store";
import { AnimatePresence } from "framer-motion";
import { getCookie } from "utils/cookie";
import { useEffect } from "react";
import { useUserStore } from "stores/user.store";

export default function Home() {
  const { getOpenModal } = useModalStore();
  const { clear } = useUserStore();

  useEffect(() => {
    if (getCookie("accessToken") === undefined) {
      clear();
    }
  }, [getCookie("accessToken")]);

  return (
    <HomeLayout>
      <Outlet />

      <AnimatePresence>
        {getOpenModal() === "Category" && <CreateCategory />}
      </AnimatePresence>
    </HomeLayout>
  );
}
