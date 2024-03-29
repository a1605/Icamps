import dayjs from "dayjs";
import ActionButton from "../../common/components/actionButton/ActionButton";
import {
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
} from "../../common/global.constant";
import { useAuth } from "../../common/hooks/useAuth";

const showDeleteOverlay = (data) => {
  if (data.associatedUsers == 0) {
    return true;
  } else {
    toast.error("Row can't be deleted.");
    return false;
  }
};

export const transformTableData = ({
  data,
  onEdit,
  onView,
  onDelete,
  openDrawer,
  setOpenDrawer,
  setRoleName,
}) => {
  if (!data) return [];
  let arr = [];
  const { auth } = useAuth();
  data.map((item) => {
    arr.push({
      ...item,
      id: item.roleId,
      roleName: item.name,
      associatedUsers:
        item.associatedUsers > 0 ? (
          <button
            className="associatedUsers"
            onClick={() => {
              setRoleName(item.name);
              setOpenDrawer(!openDrawer);
            }}
          >
            {item.associatedUsers}
          </button>
        ) : (
          <span className="associatedUserSecond">{item.associatedUsers}</span>
        ),
      updatedOn: dayjs(item.updatedOn).format(`YYYY-MM-DD`),
      action: (
        <ActionButton
          data={item}
          {...(auth.screens.roles?.includes(PERMISSION_MAPPING.UPDATE)
            ? { onEdit: onEdit }
            : {})}
          onView={onView}
          showMenu={
            auth.screens.roles?.includes(PERMISSION_MAPPING.DELETE) &&
            item.status !== GLOBAL_STATUS.DELETED
          }
          showDeleteOverlay={showDeleteOverlay}
          onStatusChange={onDelete}
          permissionTitle="roles"
        />
      ),
    });
  });
  return arr;
};

export const RoleViewData = (data) => {
  if (!data) return {};
  let arr = [];
  data?.map((item) => {
    arr.push({
      mobileNo: item.mobileNo,
      userName: `${item.firstName} ${item.lastName}`,
      email: item.email,
      roles: item.roles,
    });
  });
  return { columnRoleView: arr };
};

export const transformFilterValues = (data) => {
  if (!data) return [];
  return [...new Set(data.map((item) => item.name))].map((item) => ({
    id: item,
    label: item,
  }));
};

export const transformPermissionData = (data) => {
  if (!data) return [];
  let arr = {
    news: [],
    alert: [],
    advisory: [],
    apps: [],
    "best practices": [],
    "blacklisted number": [],
    fraud:[],
    devices: [],
    email: [],
    issue: [],
    "about icamps":[],
    FAQ:[],
    "phising link": [],
    network: [],
    os: [],
    roles: [],
    user: [],
    vulnerability: [],
    sms: [],
    miscellaneous: [],
    feedback: [],
    "cyber cell": [],
  };
  data.map((item) => {
    if (Object.keys(arr).includes(item.title))
      arr[item.title] = [
        ...arr[item.title],
        { name: item.name.trim(" "), permissionId: item.permissionId },
      ];
  });
  return arr;
};

export const isDataValidRoles = (data, error, setError) => {
  let title = [];
  let message = [];
  // CHecking Empty
  if (data.name.trim().length === 0) {
    title.push("roleName");
    message.push({ title: "roleName", message: "Role Name is required" });
  } else if (data.name.trim().length > 50) {
    title.push("roleName");
    message.push({
      title: "roleName",
      message: "character more than 50 not allowed",
    });
  }
  if (data.description.trim().length > 10000) {
    title.push("rolesDescription");
    message.push({
      title: "rolesDescription",
      message: "character more than 10000 not allowed",
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

export const autoSelectPermission = (
  value,
  allValues,
  setRoleBody,
  roleBody
) => {
  let arr = [parseInt(value)];
  if (allValues.create === parseInt(value)) {
    arr = [allValues.create, allValues.update, allValues.view];
  } else if (allValues.update === parseInt(value)) {
    arr = [allValues.update, allValues.view];
  } else if (allValues.delete === parseInt(value)) {
    arr = [allValues.delete, allValues.view];
  } else if (allValues.bulkupload === parseInt(value)) {
    arr = [allValues.bulkupload, allValues.view, allValues.create];
  } else if (allValues["approve/reject"] === parseInt(value)) {
    arr = [allValues["approve/reject"], allValues.view];
  } else if (allValues["advice/comment"] === parseInt(value)) {
    arr = [allValues["advice/comment"], allValues.view];
  } else if (allValues.broadcast === parseInt(value)) {
    arr = [allValues.broadcast, allValues.view];
  }

  const perm = new Set([...roleBody.permissions, ...arr]);
  setRoleBody((roleBody) => ({
    ...roleBody,
    permissions: Array.from(perm),
  }));
};
