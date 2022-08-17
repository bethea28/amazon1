import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from "../Resources/Constants";

export async function createUser(update: object) {

  type createUserResponse = {
    data: object
  };

  try {
    await axiosInstance.post<createUserResponse>(`/profile`, update);
  } catch (error) {
    console.log(error);
  }
}