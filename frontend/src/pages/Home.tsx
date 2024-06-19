import { Outlet } from "react-router-dom";

import HomeLayout from "components/HomeLayout";
import CreateCategory from "components/CreateCategory";
import { useModalStore } from "stores/modal.store";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { getOpenModal } = useModalStore();

  return (
    <HomeLayout>
      <Outlet />

      <AnimatePresence>
        {getOpenModal() === "Category" && <CreateCategory />}
      </AnimatePresence>
    </HomeLayout>
  );
}
