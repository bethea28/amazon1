import axios from "axios";

export const interests = ["music", "art", "food", "cars", "wildlife", "pets", "technology", "literature", "healthcare", "finance", "sports", "politics", "entertainment"]
export const tempUserID = "de3caccd-fa2c-4cd0-a1bc-c9a313a09a75";
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        //"Authorization": `Bearer ${jwt}`, //(commented out until api token is determined)
    }
})

export type GetProjectsResponse = {
    projects: Array<Project>
}

export type Project = {
  projectId: string,
  userId: string,
  projectName: string,
  targetFundingNum: string
  targetFundingDate: string,
  description: string,
  categories: string,
  createdAt: string
  lastUpdatedAt: string,
}

export type User = {
  userId: string,
  avatarURL: string,
  bio: string,
  email: string,
  username: string,
  interests: string[],
  createdAt: string,
  updatedAt: string,
  lastSignOn: string
  firstName: string,
  lastName: string,
}

export const initialUserData: User = {
  userId: '',
  avatarURL: '',
  bio: '',
  email: '',
  username: '',
  interests: [''],
  createdAt: '',
  updatedAt: '',
  lastSignOn: '',
  firstName: '',
  lastName: '',
};

export type UpdateUserResponse = {
    data: object
};

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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 1,
  height: 1,
  mr: 2,
  backgroundColor: '#f5f0f0',
  borderRadius: '5px',
  fontSize: '0.875rem',
  fontWeight: '700',
  textAlign: 'center',
  label: "profile-header-picture"
}

export const profileDataBox = {
  width: 2 / 3,
  height: 3 / 4,
  mx: "auto",
  pl: 3,
  py: 1,
  backgroundColor: '#EAEAEA',
  borderRadius: 2,
  fontSize: '0.875rem',
  fontWeight: '700',
  textAlign: 'left',
  label: "My profile section"
}

export const viewProfileAdditional = {
  width: 1,
  height: 3 / 4,
  mx: "auto",
  pl: 3,
  py: 1,
  backgroundColor: '#EAEAEA',
  borderRadius: 2,
  fontSize: '0.875rem',
  fontWeight: '700',
  textAlign: 'left',
  label: "My profile section"
}

export const typographyTitle = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
}