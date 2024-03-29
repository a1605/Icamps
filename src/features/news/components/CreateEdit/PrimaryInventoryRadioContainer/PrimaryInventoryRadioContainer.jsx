import React from "react";

// Constant
import {
  PRIMARY_INVENTORY,
  PRIMARY_INVENTORY_FILTER,
} from "../../../../../common/global.constant";

// CSS
import "./PrimaryInventoryRadioContainer.scss";
import { issueFixDateTransform } from "../../../../../common/helperFunction/dateTransform";

const PrimaryInventoryRadioContainer = ({ newsData, setNewsData }) => {
  return (
    <div className="primary-inventory-radio-container">
      <h4>Primary Inventory*</h4>
      <div className="primary-item-container">
        {PRIMARY_INVENTORY_FILTER.map((item, index) => (
          <div className="inventory-input-item" key={index}>
            <input
              type="radio"
              name="inventory"
              id={item.id}
              checked={newsData.primaryInventory === item.id}
              onChange={() =>
                setNewsData({
                  ...newsData,
                  primaryInventory: item.id,
                  ...(!(
                    item.id === PRIMARY_INVENTORY.DEVICES ||
                    item.id === PRIMARY_INVENTORY.OS
                  )
                    ? { issueFixDate: issueFixDateTransform("1990-01-01") }
                    : {}),
                })
              }
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrimaryInventoryRadioContainer;
