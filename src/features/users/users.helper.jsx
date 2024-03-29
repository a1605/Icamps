import { useNavigate } from "react-router-dom";
import ActionButton from "../../common/components/actionButton/ActionButton";
import StatusBadge from "../../common/components/statusBadge/StatusBadge";
import { useAuth } from "../../common/hooks/useAuth";
import { PAGE_TYPE, PERMISSION_MAPPING } from "../../common/global.constant";
import { isEmailValid } from "../../common/global.validation";
import { toast } from "react-hot-toast";

const generateRoleString = (roles) => {
  if (roles.length === 0) {
    return "No Roles"; // Return an empty string if the roles array is empty
  } else if (roles.length === 1) {
    return roles[0].name; // Return the name of the first role if there is only one role
  } else {
    const firstRoleName = roles[0].name;
    const remainingCount = roles.length - 1;
    return `${firstRoleName} + ${remainingCount}`; // Return the name of the first role along with the remaining count
  }
};

export const transformUsersData = (data) => {
  const navigate = useNavigate();

  const { auth } = useAuth();

  const onEdit = (info) => {
    navigate(`/users/user/${PAGE_TYPE.EDIT}/${info.userId}`);
  };
  const onView = (info) => {
    navigate(`/users/user/${PAGE_TYPE.VIEW}/${info.userId}`);
  };

  return data
    ? data.map((item, i) => {
        return {
          ...item,
          id: item.userId,
          userName: item.firstName + " " + item.lastName,
          roles: generateRoleString(item.roles),
          action: (
            <ActionButton
              data={item}
              {...(auth.screens.user?.includes(PERMISSION_MAPPING.UPDATE)
                ? { onEdit: onEdit }
                : {})}
              onView={onView}
              showMenu={false}
              permissionTitle="user"
            />
          ),
          status: <StatusBadge status={item.status} />,
        };
      })
    : [];
};

export const transformPermissionsData = (userPermissions = []) => {
  const groupedPermissions = {};

  for (const permission of userPermissions) {
    const { title } = permission;

    if (!groupedPermissions.hasOwnProperty(title)) {
      groupedPermissions[title] = [];
    }
    groupedPermissions[title].push(permission);
  }

  return groupedPermissions;
};

export const transformRolesFilterData = (userRoles = []) => {
  if (!userRoles) return [];
  return userRoles.map((role) => {
    return { id: role.roleId, label: role.name };
  });
};

// Validation Function

export const isDataValid = (data, setError) => {
  let title = [];
  let message = [];
  let flag = false;
  if (data.firstName.trim().length === 0) {
    title.push("user-firstname");
    message.push({ title: "user-firstname", message: "Enter First Name" });
  } else if (data.firstName?.trim().length > 100) {
    title.push("user-firstname");
    message.push({
      title: "user-firstname",
      message: "Max character allowed is 100",
    });
  }

  if (data.lastName.trim().length === 0) {
    title.push("user-lastname");
    message.push({ title: "user-lastname", message: "Enter last name" });
  } else if (data.lastName?.trim().length > 100) {
    title.push("user-lastname");
    message.push({
      title: "user-lastname",
      message: "Max character allowed is 100",
    });
  }

  if (data.email.trim().length === 0) {
    title.push("user-email");
    message.push({ title: "user-email", message: "Enter email" });
  } else if (!isEmailValid(data.email)) {
    title.push("user-email");
    message.push({
      title: "user-email",
      message: `Enter correct email`,
    });
  } else if (data.email?.trim().length > 100) {
    title.push("user-email");
    message.push({
      title: "user-email",
      message: "Max character allowed is 100",
    });
  }
  if (
    data.mobileNo &&
    data.mobileNo !== "" &&
    (isNaN(data.mobileNo) || String(data.mobileNo)?.length !== 10)
  ) {
    title.push("user-mobileNo");
    message.push({
      title: "user-mobileNo",
      message: "Enter correct mobile number",
    });
  }

  flag = title.length > 0;
  if (data.status) {
    if (data.roles.length === 0) {
      toast.error("Select atleast one role to create active user");
      flag = true;
    }
  }

  setError({
    title: title,
    message: message,
  });
  return flag;
};
