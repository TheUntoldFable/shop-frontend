import { faStore, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "next-i18next";

const SelectAddress = ({ onSelect, selected }) => {
  const { t } = useTranslation("buttons");

  return (
    <div className="flex justify-between gap-2">
      <button
        key="home"
        value="home"
        type="button"
        onClick={() => onSelect('home')}
        id="home"
        name="home"
        className={`${
          selected === "home" ? "bg-neonGreen" : "bg-tranpsarent"
        } gap-2 flex flex-1 flex-col items-center justify-between cursor-pointer transition ease-in-out border-[2px] hover:bg-offWhite/[0.5] rounded-md p-4`}
      >
        <FontAwesomeIcon icon={faStore} />
        <div>{t("delivery_home")}</div>
      </button>
      <button
        key="office"
        type="button"
        onClick={() => onSelect('office')}
        value="office"
        id="office"
        name="office"
        className={`${
          selected === "office" ? "bg-neonGreen" : "bg-tranpsarent"
        } gap-2 flex flex-1 flex-col items-center justify-between cursor-pointer transition ease-in-out border-[2px] hover:bg-offWhite/[0.5] rounded-md p-4`}
      >
        <FontAwesomeIcon icon={faTruck} />
        <div>{t("delivery_office")}</div>
      </button>
    </div>
  );
};

export default SelectAddress;
