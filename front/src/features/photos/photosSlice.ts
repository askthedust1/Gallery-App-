import { GlobalError, IPhoto } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  createPhoto,
  deletePhoto,
  fetchPhotos,
  fetchUserPhotos,
} from "./photosThunk";

interface PhotosState {
  photos: IPhoto[];
  userPhotos: IPhoto[];
  fetchLoading: boolean;
  fetchLoadingUser: boolean;
  createError: GlobalError | null;
  createLoading: boolean;
  delLoading: boolean;
}

const initialState: PhotosState = {
  photos: [],
  userPhotos: [],
  fetchLoading: false,
  fetchLoadingUser: false,
  createError: null,
  createLoading: false,
  delLoading: false,
};

export const PhotosSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchPhotos.fulfilled, (state, { payload: ph }) => {
      state.fetchLoading = false;
      state.photos = ph;
    });

    builder.addCase(fetchPhotos.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchUserPhotos.pending, (state) => {
      state.fetchLoadingUser = true;
    });

    builder.addCase(fetchUserPhotos.fulfilled, (state, { payload: ph }) => {
      state.fetchLoadingUser = false;
      state.userPhotos = ph;
    });

    builder.addCase(fetchUserPhotos.rejected, (state) => {
      state.fetchLoadingUser = false;
    });

    builder.addCase(createPhoto.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });

    builder.addCase(createPhoto.fulfilled, (state) => {
      state.createLoading = false;
    });

    builder.addCase(createPhoto.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.createError = error || null;
    });

    builder.addCase(deletePhoto.pending, (state) => {
      state.delLoading = true;
    });

    builder.addCase(deletePhoto.fulfilled, (state) => {
      state.delLoading = false;
    });

    builder.addCase(deletePhoto.rejected, (state) => {
      state.delLoading = false;
    });
  },
});

export const photosReducer = PhotosSlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectUserPhotos = (state: RootState) => state.photos.userPhotos;

export const selectPhotosLoading = (state: RootState) =>
  state.photos.fetchLoading;
export const selectPhotosError = (state: RootState) => state.photos.createError;
export const selectPhotosDel = (state: RootState) => state.photos.delLoading;
export const selectPhotosCreateLoading = (state: RootState) =>
  state.photos.createLoading;
