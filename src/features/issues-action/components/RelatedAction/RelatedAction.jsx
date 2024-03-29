import React, { useMemo } from "react";

// Assets Images
import { crossIcon } from "../../../../assets/images";

// Constant
import { PAGE_TYPE } from "../../../../common/global.constant";

// Component
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import ErrorBox from "../../../../common/components/Error/ErroBox";

// Hooks
import { useGetActions } from "../../hooks/useGetActions";

// Helper
import "./RelatedAction.scss";

// CSS
import { transformActionDropdownList } from "../../issuesAction.helper";

const RelatedAction = ({ issueData, setIssueData, pageType }) => {
  const { data, isLoading, isError } = useGetActions();

  const dropdownList = useMemo(
    () =>
      !isLoading && !isError ? transformActionDropdownList(data?.data) : [],
    [isLoading, isError, data?.data]
  );

  const deleteHandler = (id) => {
    setIssueData({
      ...issueData,
      actionsId: issueData.actionsId.filter((item) => item.id != id),

      ...(issueData.recommendedAction == id ? { recommendedAction: "" } : {}),
    });
  };

  const changeHandler = (value) => {
    setIssueData((prevData) => ({
      ...prevData,
      actionsId: value,
    }));
  };

  return (
    <div className="related-action-container">
      {pageType !== PAGE_TYPE.VIEW && (
        <div className="action-container">
          <DropdownMultiSelect
            optionData={dropdownList}
            selectedValues={issueData.actionsId}
            setSelectedValues={(value) => {
              changeHandler(value);
            }}
            showChips={false}
            placeholder="Choose Action"
            multiple={true}
            disableCloseOnSelect={true}
            title={"relatedAction"}
            searchable={true}
          />

          <ErrorBox title={"relatedAction"} />
        </div>
      )}

      <div className="showcase-container">
        {issueData.actionsId.length > 0 &&
          issueData.actionsId.map((item) => (
            <div className="showcase-item" key={item.id}>
              <p>
                {item.label}{" "}
                {pageType === PAGE_TYPE.VIEW &&
                  issueData.recommendedAction == item.id &&
                  "(Recommended)"}
              </p>
              {pageType !== PAGE_TYPE.VIEW && (
                <div className="showcase-action">
                  <label htmlFor={item.label}>
                    <input
                      type="radio"
                      name="primary"
                      id={item.label}
                      checked={item.id == issueData.recommendedAction}
                      onChange={() =>
                        setIssueData((prevData) => ({
                          ...prevData,
                          recommendedAction: String(item.id),
                        }))
                      }
                    />
                    Recommended
                  </label>
                  <button
                    className="delete-button"
                    onClick={() => deleteHandler(item.id)}
                  >
                    <img src={crossIcon} alt="cross-icon" />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedAction;
