import { useEffect } from "react";

import useBearStore from "@/shared/store/useBearStore";

const StoreHydration = () => {
  useEffect(() => {
    useBearStore.persist.rehydrate();
  }, []);

  return null;
};

export default StoreHydration;
