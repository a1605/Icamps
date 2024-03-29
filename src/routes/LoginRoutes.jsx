import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BestPractices from "../features/Best Practices/BestPractices";
import CreateBestPractices from "../features/Best Practices/Create/CreateBestPractices";
import CreateFraud from "../features/fraud/Create/CreateFraud";
import Fraud from "../features/fraud/Fraud";
import Email from "../features/Email/Email";
import CreateFaq from "../features/Faq/Create/CreateFaq";
import PhisingLink from "../features/Phising Link/PhisingLink";
import SMS from "../features/SMS/SMS";
import BulkUpload from "../features/bulk upload/BulkUpload";
import IssuesAction from "../features/issues-action/IssuesAction";

const CyberCell = lazy(() => import("../features/CyberCell/CyberCell"));

const AboutUs = lazy(() => import("../features/about/CreateAbout"));

const CreateCyberCell = lazy(() =>
  import("../features/CyberCell/Create/CreateCyberCell")
);

const CreateNetwork = lazy(() =>
  import("../features/network/Create/CreateNetwork")
);

const Network = lazy(() => import("../features/network/Network"));
const Dashboard = lazy(() => import("../features/dashboard"));
const Feedback = lazy(() => import("../features/feedback/Feedback"));

// News Imports
const News = lazy(() => import("../features/news"));
const CreateEdit = lazy(() =>
  import("../features/news/components/CreateEdit/CreateEdit")
);
const DisplayInformation = lazy(() =>
  import("../features/news/components/DisplayInformation/DisplayInformation")
);

// OS Imports
const CreateOS = lazy(() =>
  import("../features/os/components/CreateOS/CreateOS")
);
const Os = lazy(() => import("../features/os"));

// Device Imports
const Devices = lazy(() => import("../features/device"));
const CreateDevice = lazy(() =>
  import("../features/device/components/Create/CreateDevice")
);

const InventoryApp = lazy(() => import("../features/app/InventoryApp"));

const CreateApplication = lazy(() =>
  import("../features/app/components/Create/CreateApplication")
);

// Roles Imports
const Roles = lazy(() => import("../features/roles"));
const CreateRole = lazy(() =>
  import("../features/roles/CreateRole/CreateRole")
);
//Approver Imports
const RequestApprovalInformation = lazy(() => import("../features/approval"));
const RequestApprovalDevice = lazy(() => import("../features/approvalDevice"));
const RequestApprovalOs = lazy(() => import("../features/approvalOs"));
// Users Imports
const Users = lazy(() => import("../features/users/Users"));
const UsersUpsert = lazy(() =>
  import("../features/users/components/UsersUpsert/UsersUpsert")
);

//Advisory Imports
const RequestAdvisory = lazy(() => import("../features/advisory"));
const AdvisorDevice = lazy(() => import("../features/advisory/device"));
const AdvisorOs = lazy(() => import("../features/advisory/os"));

//Blacklisted Number

const BlacklistNumber = lazy(() =>
  import("../features/blacklist-number/blacklistNumber")
);
const CreateBlacklist = lazy(() =>
  import("../features/blacklist-number/components/Create/CreateBlacklistNumber")
);

//miscellaneous Screen
const MiscellaneousScreen = lazy(() =>
  import("../features/Miscellanius Screen/MiscellaneousScreen")
);
const Faq = lazy(() => import("../features/Faq/Faq"));

// Error

const Page403 = lazy(() => import("../common/errorPages/Page403"));
const Page404 = lazy(() => import("../common/errorPages/Page404"));
const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Issue & Action Routes */}
      <Route path="/issues-action/:screenType" element={<IssuesAction />} />
      <Route
        path="/issues-action/:screenType/:pageType/"
        element={<IssuesAction />}
      />
      <Route
        path="/issues-action/:screenType/:pageType/:id"
        element={<IssuesAction />}
      />
      <Route path="/inventory/feedback" element={<Feedback />} />
      <Route path="/inventory/feedback/:pageType/:id" element={<Feedback />} />

      {/* Information Routes */}
      <Route path="/information" element={<News />} />
      <Route path="/information/:pageType/:infoType" element={<CreateEdit />} />
      <Route
        path="/information/:pageType/:infoType/:id"
        element={<CreateEdit />}
      />
      <Route
        path="/information/view/:viewType/:id"
        element={<DisplayInformation />}
      />

      <Route path="/about-us" element={<AboutUs />} />
      {/* Inventory Routes */}
      {/* Device */}
      <Route path="/inventory/devices" element={<Devices />} />
      <Route
        path="/inventory/:screen/devices"
        element={<RequestApprovalDevice />}
      />
      <Route path="/inventory/advisor/devices" element={<AdvisorDevice />} />

      <Route path="/:screen/devices/:pageType" element={<CreateDevice />} />
      <Route path="/:screen/devices/:pageType/:id" element={<CreateDevice />} />

      <Route
        path="/inventory/:screen/devices/:pageType"
        element={<CreateDevice />}
      />
      <Route
        path="/inventory/:screen/devices/:pageType/:id"
        element={<CreateDevice />}
      />

      {/* Apps */}
      <Route path="/inventory/apps" element={<InventoryApp />} />
      <Route path="/inventory/apps/:pageType" element={<CreateApplication />} />
      <Route
        path="/inventory/apps/:pageType/:id"
        element={<CreateApplication />}
      />
      {/* Apps Advisor & Approver*/}
      <Route path="/inventory/:screenType/apps" element={<InventoryApp />} />
      <Route
        path="/inventory/:screenType/apps/:pageType"
        element={<CreateApplication />}
      />
      <Route
        path="/inventory/:screenType/apps/:pageType/:id"
        element={<CreateApplication />}
      />

      {/* OS */}
      <Route path="/inventory/os" element={<Os />} />
      <Route path="/:screenType/os/:pageType" element={<CreateOS />} />
      <Route path="/:screenType/os/:pageType/:id" element={<CreateOS />} />

      {/* Blacklisted Number */}

      <Route
        path="/inventory/blacklistedNumber"
        element={<BlacklistNumber />}
      />
      <Route
        path="/inventory/:screenType/blacklistedNumber"
        element={<BlacklistNumber />}
      />

      <Route
        path="/inventory/blacklistedNumber/:pageType"
        element={<CreateBlacklist />}
      />
      <Route
        path="/inventory/:screenType/blacklistedNumber/:pageType"
        element={<CreateBlacklist />}
      />
      <Route
        path="/inventory/blacklistedNumber/:pageType/:id"
        element={<CreateBlacklist />}
      />
      <Route
        path="/inventory/:screenType/blacklistedNumber/:pageType/:id"
        element={<CreateBlacklist />}
      />

      {/* Roles Routes */}
      <Route path="/:screenType" element={<Roles />} />
      <Route path="/roles/:pageType" element={<CreateRole />} />
      <Route path="/roles/:pageType/:id" element={<CreateRole />} />

      {/* Approval Screen Routes */}
      <Route
        path="/approval/information"
        element={<RequestApprovalInformation />}
      />

      {/* FAQ Screen Routes */}
      <Route path="/faq" element={<Faq />} />
      <Route path="/faq/:pageType" element={<Faq />} />
      <Route path="/faq/:pageType/:id" element={<Faq />} />

      {/* miscellaneous Screen Routes */}
      <Route
        path="/miscellaneous/:screenType"
        element={<MiscellaneousScreen />}
      />
      <Route
        path="/miscellaneous/:screenType/:pageType"
        element={<MiscellaneousScreen />}
      />
      <Route
        path="/miscellaneous/:screenType/:pageType/:id"
        element={<MiscellaneousScreen />}
      />

      <Route path="/inventory/:screenType/os" element={<RequestApprovalOs />} />

      {/* Blacklisted Number */}

      <Route path="/advisory/information" element={<RequestAdvisory />} />
      <Route path="/inventory/advisor/os" element={<AdvisorOs />} />

      {/*Users Routes */}
      <Route path="/users" element={<Users />} />
      {/* <Route path="/users/:type/:id?" element={<UsersUpsert />} /> */}
      <Route path="/users/:type/:screenType/:id?" element={<UsersUpsert />} />

      {/* Network */}

      <Route path="/inventory/phising-link" element={<PhisingLink />} />

      {/* Best Practices */}
      <Route path="/inventory/best-practice" element={<BestPractices />} />
      <Route
        path="/inventory/best-practice/:pageType"
        element={<CreateBestPractices />}
      />
      <Route
        path="/inventory/best-practice/:pageType/:id"
        element={<CreateBestPractices />}
      />

      {/* Fraud */}
      <Route path="/inventory/fraud" element={<Fraud />} />
      <Route
        path="/inventory/fraud/:pageType"
        element={<CreateFraud />}
      />
      <Route
        path="/inventory/fraud/:pageType/:id"
        element={<CreateFraud />}
      />

      <Route path="/inventory/sms" element={<SMS />} />
      <Route path="/inventory/email" element={<Email />} />
      <Route path="/inventory/cyber-security" element={<CyberCell />} />
      <Route path="/bulk-upload/:type" element={<BulkUpload />} />
      <Route
        path="/inventory/cyber-security/:pageType/:id"
        element={<CreateCyberCell />}
      />
      <Route
        path="/inventory/cyber-security/:pageType"
        element={<CreateCyberCell />}
      />

      <Route path="/inventory/network" element={<Network />} />

      {/* Network */}
      <Route
        path="/inventory/network/:pageType/:id"
        element={<CreateNetwork />}
      />
      <Route path="/inventory/network/:pageType" element={<CreateNetwork />} />

      {/* Error Pages */}
      <Route path="/*" element={<Navigate to="/" />} />
      <Route path="/access-dined" element={<Page403 />} />
      <Route path="/error-404" element={<Page404 />} />
    </Routes>
  );
};

export default LoginRoutes;
