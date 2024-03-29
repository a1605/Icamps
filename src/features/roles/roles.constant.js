export const ROLES_COLUMNS = [
  {
    key: "roleName",
    header: "Role Name",
    sorting: false,
  },
  {
    key: "description",
    header: "Description",
    sorting: false,
  },
  {
    key: "updatedBy",
    header: "Updated By",
    sorting: true,
    maxWidth: "20%",
    minWidth: "20%",
  },
  {
    key: "updatedOn",
    header: "Updated On",
    sorting: true,
    maxWidth: "10%",
    minWidth: "10%",
  },
  {
    key: "associatedUsers",
    header: "Associated Users",
    sorting: false,
    maxWidth: "10%",
    minWidth: "10%",
  },
  {
    key: "action",
    header: "Action",
    type: ["edit", "view", "menu"],
    sorting: false,
    maxWidth: "10%",
    minWidth: "10%",
  },
];

export const ROLES_STATUS = {
  DRAFT: "IN_PROGRESS",
  REJECTED: "REJECTED",
  APPROVED: "APPROVED",
  SUBMITTED: "IN_APPROVAL",
  deleteD: "deleteD",
  ADVICE_C: "ADVICE_C",
  ADVICE_A: "ADVICE_A",
  UNPUBLISHED: "UNPUBLISHED",
  REQ_UNPUBLISHED: "REQ_UNPUBLISHED",
};

export const FILTER_VALUES = [
  { label: ROLES_STATUS.DRAFT, id: ROLES_STATUS.DRAFT },
  { label: ROLES_STATUS.SUBMITTED, id: ROLES_STATUS.SUBMITTED },
  { label: ROLES_STATUS.APPROVED, id: ROLES_STATUS.APPROVED },
  { label: ROLES_STATUS.REJECTED, id: ROLES_STATUS.REJECTED },
  { label: ROLES_STATUS.ADVICE_C, id: ROLES_STATUS.ADVICE_C },
  { label: ROLES_STATUS.ADVICE_A, id: ROLES_STATUS.ADVICE_A },
  { label: ROLES_STATUS.UNPUBLISHED, id: ROLES_STATUS.UNPUBLISHED },
  { label: ROLES_STATUS.REQ_UNPUBLISHED, id: ROLES_STATUS.REQ_UNPUBLISHED },
  { label: ROLES_STATUS.deleteD, id: ROLES_STATUS.deleteD },
];

export const ROLE_PERMISSION_VALUES = [
  {
    title: "",
    sections: [
      {
        sectionHeading: "user",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
          ],
        ],
      },
    ],
  },
  {
    title: "",
    sections: [
      {
        sectionHeading: "issue",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
        ],
      },
    ],
  },
  {
    title: "",
    sections: [
      {
        sectionHeading: "roles",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
        ],
      },
    ],
  },
  {
    title: "",
    sections: [
      {
        sectionHeading: "miscellaneous",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
        ],
      },
    ],
  },
  {
    title: "About ICAMPS",
    sections: [
      {
        sectionHeading: "about icamps",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },

            { label: "update", isChecked: false },
          ],
        ],
      },
      {
        sectionHeading: "FAQ",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
        ],
      },
    ],
  },
  {
    title: "",
    sections: [
      {
        sectionHeading: "feedback",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "update", isChecked: false },
          ],
        ],
      },
    ],
  },
  {
    title: "Information",
    sections: [
      {
        sectionHeading: "news",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
          [{ label: "broadcast", isChecked: false }],
          [{ label: "approve/reject", isChecked: false }],
          [{ label: "advice/comment", isChecked: false }],
        ],
      },
      {
        sectionHeading: "advisory",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
          [{ label: "broadcast", isChecked: false }],
          [{ label: "approve/reject", isChecked: false }],
          [{ label: "advice/comment", isChecked: false }],
        ],
      },
      {
        sectionHeading: "vulnerability",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
          [{ label: "broadcast", isChecked: false }],
          [{ label: "approve/reject", isChecked: false }],
          [{ label: "advice/comment", isChecked: false }],
        ],
      },
      {
        sectionHeading: "alert",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
          [{ label: "broadcast", isChecked: false }],
          [{ label: "approve/reject", isChecked: false }],
          [{ label: "advice/comment", isChecked: false }],
        ],
      },
    ],
  },
  {
    title: "Inventory",
    sections: [
      {
        sectionHeading: "devices",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
          [{ label: "bulkupload", isChecked: false }],
          [{ label: "approve/reject", isChecked: false }],
          [{ label: "advice/comment", isChecked: false }],
        ],
      },
      {
        sectionHeading: "apps",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
          [{ label: "bulkupload", isChecked: false }],
          [{ label: "approve/reject", isChecked: false }],
          [{ label: "advice/comment", isChecked: false }],
        ],
      },
      {
        sectionHeading: "os",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
          [{ label: "bulkupload", isChecked: false }],
          [{ label: "approve/reject", isChecked: false }],
          [{ label: "advice/comment", isChecked: false }],
        ],
      },

      {
        sectionHeading: "blacklisted number",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
          [{ label: "bulkupload", isChecked: false }],
          [{ label: "approve/reject", isChecked: false }],
          [{ label: "advice/comment", isChecked: false }],
        ],
      },
      {
        sectionHeading: "cyber cell",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
          [{ label: "bulkupload", isChecked: false }],
        ],
      },
      {
        sectionHeading: "network",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
          [{ label: "bulkupload", isChecked: false }],
        ],
      },

      {
        sectionHeading: "best practices",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
        ],
      },
      {
        sectionHeading: "fraud",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
        ],
      },
      {
        sectionHeading: "phising link",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
        ],
      },
      {
        sectionHeading: "sms",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
        ],
      },
      {
        sectionHeading: "email",
        checkboxSection: [
          [
            { label: "all", isChecked: false },
            { label: "view", isChecked: false },
            { label: "create", isChecked: false },
            { label: "update", isChecked: false },
            { label: "delete", isChecked: false },
          ],
        ],
      },
    ],
  },
];

export const PERMISSION_NAME = ["view", "create", "update", "delete"];

export const ROLES_QUERY_KEYS = {
  GET_ALL_PERMISSIONS: "get-permission-list",
  GET_ALL_ROLES: "get-roles-list",
  GET_SINGLE_ROLE: "get-single-role",
  GET_ROLE_VIEW: "get-role-user",
  GET_ROLES_FILTER: "get-roles-filter",
};
export const COLUMN_USER_ROLE_VIEW_HEADING = [
  {
    key: "userName",
    header: "User Name",
    sorting: false,
  },
  {
    key: "email",
    header: "Email",
    sorting: false,
  },
  {
    key: "mobileNo",
    header: "Mobile Number",
    sorting: false,
  },
];
