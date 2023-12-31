import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError, IPhoto, PhotoMutation, PhotoResponse } from "../../types";
import axiosApi from "../../axiosApi";
import { isAxiosError } from "axios";

export const fetchPhotos = createAsyncThunk<IPhoto[]>(
  "photos/fetchAll",
  async () => {
    const photosResponse = await axiosApi.get<IPhoto[]>("/photos");
    return photosResponse.data;
  },
);

export const fetchUserPhotos = createAsyncThunk(
  "photos/fetchUserAll",
  async (id: string) => {
    const photosResponse = await axiosApi.get<IPhoto[]>("/photos?user=" + id);
    return photosResponse.data;
  },
);

export const createPhoto = createAsyncThunk<
  PhotoResponse,
  PhotoMutation,
  { rejectValue: GlobalError }
>("photos/create", async (photoMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(photoMutation) as (keyof PhotoMutation)[];

    keys.forEach((key) => {
      const value = photoMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post("/photos", formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deletePhoto = createAsyncThunk<void, string>(
  "photo/delete",
  async (id) => {
    await axiosApi.delete("/photos/" + id);
  },
);
