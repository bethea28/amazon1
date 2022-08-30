import axios from "axios";

export const interests = [
  "Music",
  "Art",
  "Food",
  "Cars",
  "Wildlife",
  "Pets",
  "Technology",
  "Literature",
  "Healthcare",
  "Finance",
  "Sports",
  "Politics",
  "Entertainment",
];
export const tempUserID = "de3caccd-fa2c-4cd0-a1bc-c9a313a09a75";
export const tempProjectID = "5f460f1d-493d-4b36-ad7d-98c867700377";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 20000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    //"Authorization": `Bearer ${jwt}`, //(commented out until api token is determined)
  },
});

export type GetProjectsResponse = {
  projects: Project[];
};

export type Project = {
  projectId: string;
  userId: string;
  projectName: string;
  totalFundedNum: number;
  targetFundingNum: number;
  targetFundingDate: string;
  description: string;
  categories: string;
  createdAt: string;
  lastUpdatedAt: string;
  photoURLs: string[];
};

export const initialProjectData: Project = {
  projectId: "",
  userId: "",
  projectName: "",
  totalFundedNum: 0,
  targetFundingNum: 0,
  targetFundingDate: "",
  description: "",
  categories: "",
  createdAt: "",
  lastUpdatedAt: "",
  photoURLs: [""],
};

export type User = {
  userId: string;
  avatarURL: string;
  bio: string;
  email: string;
  username: string;
  interests: string[];
  createdAt: string;
  updatedAt: string;
  lastSignOn: string;
  firstName: string;
  lastName: string;
};

export const initialUserData: User = {
  userId: "",
  avatarURL: "",
  bio: "",
  email: "",
  username: "",
  interests: [""],
  createdAt: "",
  updatedAt: "",
  lastSignOn: "",
  firstName: "",
  lastName: "",
};

export type UpdateUserResponse = {
  data: object;
};

export type CommentData = {
  id?: string,
  content: string,
  userId?: string,
  projectId: string,
  username?: string,
  avatarURL?: string,
  createdAt?: string,
  updatedAt?: string
}

export const profileBackgroundImageBox = {
  width: 1,
  height: 1 / 4,
  my: 3,
  mr: 2,
  backgroundColor: '#EAEAEA',
  borderRadius: '5px',
  fontSize: '0.875rem',
  fontWeight: '700',
  textAlign: 'center',
  label: "profile-header-picture"
}

export const viewProfileInfo = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: 1,
  mr: 2,
  backgroundColor: "#f5f0f0",
  borderRadius: "5px",
  fontSize: "0.875rem",
  fontWeight: "700",
  textAlign: "center",
  label: "profile-header-picture",
};

export const profileDataBox = {
  width: 2 / 3,
  height: 3 / 4,
  mx: "auto",
  pl: 3,
  py: 1,
  backgroundColor: "#EAEAEA",
  borderRadius: 2,
  fontSize: "0.875rem",
  fontWeight: "700",
  textAlign: "left",
  label: "My profile section",
};

export const viewProfileAdditional = {
  width: 1,
  height: 3 / 4,
  mx: "auto",
  pl: 3,
  py: 1,
  backgroundColor: "#EAEAEA",
  borderRadius: 2,
  fontSize: "0.875rem",
  fontWeight: "700",
  textAlign: "left",
  label: "My profile section",
};

export const typographyTitle = {
  mr: 2,
  display: { xs: "none", md: "flex" },
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
};

export const noPhoto =
  "https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
