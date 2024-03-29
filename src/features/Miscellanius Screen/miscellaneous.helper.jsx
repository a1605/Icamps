import ActionButton from "../../common/components/actionButton/ActionButton";
import { issueFixDateTransform } from "../../common/helperFunction/dateTransform";

export const transformManufacturerTableData = (data, onEdit, onDelete) => {
  if (data)
    return data.map((item) => ({
      ...item,
      id: item.manufacturerId,
      updatedOn: issueFixDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          onEdit={onEdit}
          onStatusChange={onDelete}
          permissionTitle="miscellaneous"
          onDelete={onDelete}
        />
      ),
    }));
  else return [];
};

export const transformPermissionsTableData = (data, onEdit, onDelete) => {
  if (data)
    return data.map((item) => ({
      ...item,
      id: item.permissionRequiredId,
      updatedOn: issueFixDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          onEdit={onEdit}
          onStatusChange={onDelete}
          permissionTitle="miscellaneous"
          onDelete={onDelete}
        />
      ),
    }));
  else return [];
};

export const transformThirdPartyTableData = (data, onEdit, onDelete) => {
  if (data)
    return data.map((item) => ({
      ...item,
      id: item.thirdPartyLibrariesId,
      updatedOn: issueFixDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          onEdit={onEdit}
          onStatusChange={onDelete}
          permissionTitle="miscellaneous"
          onDelete={onDelete}
        />
      ),
    }));
  else return [];
};

export const transformAppPublisherTableData = (data, onEdit, onDelete) => {
  if (data)
    return data.map((item) => ({
      ...item,
      id: item.appPublisherId,
      updatedOn: issueFixDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          onEdit={onEdit}
          onStatusChange={onDelete}
          permissionTitle="miscellaneous"
          onDelete={onDelete}
        />
      ),
    }));
  else return [];
};

export const transformCPUTableData = (data, onEdit, onDelete) => {
  if (data)
    return data.map((item) => ({
      ...item,
      id: item.cpuId,
      updatedOn: issueFixDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          onEdit={onEdit}
          onStatusChange={onDelete}
          permissionTitle="miscellaneous"
          onDelete={onDelete}
        />
      ),
    }));
  else return [];
};

export const transformGPUTableData = (data, onEdit, onDelete) => {
  if (data)
    return data.map((item) => ({
      ...item,
      id: item.gpuId,
      updatedOn: issueFixDateTransform(item.updatedOn),
      action: (
        <ActionButton
          data={item}
          onEdit={onEdit}
          onStatusChange={onDelete}
          permissionTitle="miscellaneous"
          onDelete={onDelete}
        />
      ),
    }));
  else return [];
};
