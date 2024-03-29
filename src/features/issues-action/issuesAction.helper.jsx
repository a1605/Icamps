import ActionButton from "../../common/components/actionButton/ActionButton";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import { PAGE_TYPE, PERMISSION_MAPPING } from "../../common/global.constant";

import { onlyDateTransform } from "../../common/helperFunction/dateTransform";
import { useAuth } from "../../common/hooks/useAuth";

export const transformListingData = (data, onEdit, onView, onDelete) => {
  const { auth } = useAuth();
  if (data)
    return data.map((item) => ({
      ...item,
      id: item.issueId,
      updatedOn: onlyDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          onEdit={
            auth.screens.issue.includes(PERMISSION_MAPPING.UPDATE)
              ? onEdit
              : "no-edit"
          }
          onView={onView}
          onStatusChange={onDelete}
          showMenu={
            auth.screens.issue.includes(PERMISSION_MAPPING.DELETE) &&
            auth.screens.issue.includes(PERMISSION_MAPPING.UPDATE)
              ? true
              : "no-edit"
          }
          permissionTitle="issue"
        />
      ),
      status: <StatusBadge status={item.status} />,
    }));
  else return [];
};

export const transformActionList = (data, onEdit, onView, onDelete) => {
  const { auth } = useAuth();
  if (data)
    return data.map((item) => ({
      ...item,
      id: item.actionId,
      updatedOn: onlyDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          onEdit={
            auth.screens.issue.includes(PERMISSION_MAPPING.UPDATE)
              ? onEdit
              : "no-edit"
          }
          onView={onView}
          onStatusChange={onDelete}
          showMenu={
            auth.screens.issue.includes(PERMISSION_MAPPING.DELETE) &&
            auth.screens.issue.includes(PERMISSION_MAPPING.UPDATE)
              ? true
              : "no-edit"
          }
          permissionTitle="issue"
        />
      ),
    }));
  else return [];
};

export const transformActionDropdownList = (data) => {
  if (!data) return [];
  return data.map((item) => ({
    id: item.actionId,
    label: item.name,
  }));
};

export const issueHeadingName = (pageType) => {
  switch (pageType) {
    case PAGE_TYPE.CREATE:
      return "Create new issue";
    case PAGE_TYPE.EDIT:
      return "Edit Issue";
    default:
      return "Issue Details";
  }
};

export const actionHeadingName = (pageType) => {
  switch (pageType) {
    case PAGE_TYPE.CREATE:
      return "Create new Action";
    case PAGE_TYPE.EDIT:
      return "Edit Action";
    default:
      return "Action Details";
  }
};

export const isDataValidIssue = (data, error, setError) => {
  let title = [];
  let message = [];

  // CHecking Empty
  if (!data.name || data.name.trim().length === 0) {
    title.push("issueName");
    message.push({ title: "issueName", message: "Issue name is required" });
  } else if (data.name?.trim().length > 500) {
    title.push("issueName");
    message.push({
      title: "issueName",
      message: "Character more than 500 not allowed",
    });
  }

  if (data.description?.trim().length > 10000) {
    title.push("issueDescription");
    message.push({
      title: "issueDescription",
      message: "Character more than 10000 not allowed",
    });
  }
  if (data.issueType?.trim().length === 0) {
    title.push("issueType");
    message.push({ title: "issueType", message: "Issue type is required" });
  }

  if (data.actionsId.length > 0 && data.recommendedAction === "") {
    title.push("relatedAction");
    message.push({
      title: "relatedAction",
      message: "Select one recommended action",
    });
  }

  if (data.actionsId.length === 0) {
    title.push("relatedAction");
    message.push({
      title: "relatedAction",
      message: "Related Action is required",
    });
  }

  if (title.length > 0) {
    setError({
      title: title,
      message: message,
    });
  } else {
    setError({
      title: [],
      message: [],
    });
  }

  return title.length > 0;
};

export const isDataValidAction = (data, error, setError) => {
  let title = [];
  let message = [];
  // CHecking Empty
  if (!data.name || data.name.trim().length === 0) {
    title.push("actionName");
    message.push({ title: "actionName", message: "Action name is required" });
  } else if (data.name.trim().length > 500) {
    title.push("actionName");
    message.push({
      title: "actionName",
      message: "character more than 500 not allowed",
    });
  }

  if (data.description?.trim().length > 10000) {
    title.push("actionDescription");
    message.push({
      title: "actionDescription",
      message: "character more than 10000 not allowed",
    });
  }
  if (data.actionSteps?.trim().length === 0) {
    title.push("actionSteps");
    message.push({ title: "actionSteps", message: "Action Step is required" });
  }

  if (title.length > 0) {
    setError({
      title: title,
      message: message,
    });
  } else {
    setError({
      title: [],
      message: [],
    });
  }
  return title.length > 0;
};
