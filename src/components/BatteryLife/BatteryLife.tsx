import { useEffect, useState } from "react";

import { Icon } from "@components/shared/Icon/Icon";

interface BatteryManager extends EventTarget {
  charging: boolean;
  level: number;
  addEventListener: (type: "levelchange" | "chargingchange", listener: () => void) => void;
  removeEventListener: (type: "levelchange" | "chargingchange", listener: () => void) => void;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

export const BatteryLife = () => {
  const [batteryLevel, setBatteryLevel] = useState<string>("N/A");

  useEffect(() => {
    let battery: BatteryManager | null = null;
    let isMounted = true;

    const updateBattery = () => {
      if (!battery || !isMounted) {
        return;
      }

      const level = Math.round(battery.level * 100);
      setBatteryLevel(`${level}%${battery.charging ? " ⚡" : ""}`);
    };

    const getBattery = (navigator as NavigatorWithBattery).getBattery;

    if (!getBattery) {
      setBatteryLevel("N/A");
      return;
    }

    getBattery()
      .then(batteryManager => {
        if (!isMounted) {
          return;
        }

        battery = batteryManager;
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
      })
      .catch(() => setBatteryLevel("N/A"));

    return () => {
      isMounted = false;
      battery?.removeEventListener("levelchange", updateBattery);
      battery?.removeEventListener("chargingchange", updateBattery);
    };
  }, []);

  return (
    <div className="flex items-center mr-4 gap-x-1">
      <span className="text-xs font-bold cursor-pointer">{batteryLevel}</span>
      <Icon icon="battery-life" className="w-[20px]" />
    </div>
  );
};
