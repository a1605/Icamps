import {
  FEATURE_MAPPING,
  GLOBAL_STATUS,
  PERMISSION_MAPPING,
  SCREEN_TYPE,
} from "./global.constant";

export const isEmailValid = (value) => {
  let regex = new RegExp(/^\S+@\S+\.\S+$/);

  return regex.test(value);
};

export const mobileNumberValidation = (value) => {
  let regex = new RegExp(/^[1-9]\d{9}$/);
  return regex.test(value);
};

export const isValidUrl = (value) => {
  let regex = new RegExp(
    /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
  );
  return regex.test(value);
};

export const accessToCreate = (docType, auth) => {
  return auth.screens[FEATURE_MAPPING[docType]]?.includes(
    PERMISSION_MAPPING.CREATE
  ) 
};

export const accessToUpdateAndCreate = (docType, auth) => {
  
  return auth.screens[FEATURE_MAPPING[docType]]?.includes(
    PERMISSION_MAPPING.CREATE
  ) ||  auth.screens[FEATURE_MAPPING[docType]]?.includes(
    PERMISSION_MAPPING.UPDATE
  );
}

export const accessToEdit = (docType, auth, data) => {
  if (!data) return false;
  if (
    data.status === GLOBAL_STATUS.DRAFT ||
    data.status == GLOBAL_STATUS.REJECTED ||
    data.status == GLOBAL_STATUS.UNPUBLISHED ||
    data.status == GLOBAL_STATUS.DELETED
  ) {
    if (
      auth.screens[FEATURE_MAPPING[docType]]?.includes(
        PERMISSION_MAPPING.UPDATE
      ) &&
      auth.userDetails.email === data.assignee
    ) {
      return true;
    }
  }
  return false;
};

export const accessToMenu = (docType, auth, data) => {
  
   if (
    auth.screens[FEATURE_MAPPING[docType]]?.includes(
      PERMISSION_MAPPING.DELETE
    ) && auth.screens[FEATURE_MAPPING[docType]]?.includes(
      PERMISSION_MAPPING.UPDATE
    ) 
  ) {
    const cancelSet = new Set([
      GLOBAL_STATUS.SUBMITTED,
      GLOBAL_STATUS.ADVICE_C,
      GLOBAL_STATUS.REQ_UNPUBLISHED,
      GLOBAL_STATUS.ADVICE_A,
    ]);
  
    if (
      data.status === GLOBAL_STATUS.DRAFT ||
      data.status === GLOBAL_STATUS.REJECTED
    ) {
      if (
        auth.userDetails.email === data.assignee
      ) {
        return true;
      }
    } else if (
      cancelSet.has(data.status) &&
      (auth.userDetails.email === data.updatedBy ||
        auth.userDetails.email === data.requestedBy)
    ) {
      return true;
    }
    return false;
  } else {
return false;
  } 
 
};

export const accessToMenuDeleteAndUpdate = (docType, auth, data) => { 

  if (
    auth.screens[FEATURE_MAPPING[docType]]?.includes(
      PERMISSION_MAPPING.DELETE
    ) && auth.screens[FEATURE_MAPPING[docType]]?.includes(
      PERMISSION_MAPPING.UPDATE
    ) 
  ) {
    return true;
  } 
}


export const accessToMenuUpdate = (docType, auth, data) => {
  
  if (
    auth.screens[FEATURE_MAPPING[docType]]?.includes(
      PERMISSION_MAPPING.UPDATE
    ) 
  ) {
    return true;
  } 
}


export const accessToApproval = (docType, auth, data) => {
  return (
    auth.screens[FEATURE_MAPPING[docType]]?.includes(
      PERMISSION_MAPPING.APPROVER
    ) && auth.userDetails.email === data.assignee
  );
};

export const accessToAssignBack = (docType, auth, data) => {
  if (!data.assignee) return false;
  return (
    auth.screens[FEATURE_MAPPING[docType]]?.includes(
      PERMISSION_MAPPING.ADVISOR
    ) && auth.userDetails.email === data.assignee
  );
};

export const accessToChangeAssignee = (docType, auth, data, screenType) => {
  if (!data) return false;

  switch (screenType) {
    case SCREEN_TYPE.APPROVAL:
      return auth.screens[FEATURE_MAPPING[docType]]?.includes(
        PERMISSION_MAPPING.APPROVER
      );
    case SCREEN_TYPE.ADVISOR:
      return auth.screens[FEATURE_MAPPING[docType]]?.includes(
        PERMISSION_MAPPING.ADVISOR
      );
    default:
      if (
        (data.status === GLOBAL_STATUS.DRAFT ||
          data.status == GLOBAL_STATUS.REJECTED ||
          data.status == GLOBAL_STATUS.UNPUBLISHED ||
          data.status == GLOBAL_STATUS.DELETED) &&
        auth?.screens[FEATURE_MAPPING[docType]]?.includes(
          PERMISSION_MAPPING.UPDATE
        )
      ) {
        return true;
      }
  }
  return false;
};
