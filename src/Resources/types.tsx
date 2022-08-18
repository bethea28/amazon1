export type UserData = {
  name: string
  email: string
  bio: string
}

//The only valid user information being passed through the project card is the userId
export type TempUserData = {
  userId: string
  email: string
  bio: string
}