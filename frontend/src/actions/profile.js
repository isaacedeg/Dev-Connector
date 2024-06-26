import { axiosDefault as axios } from "../utils/axios";
import { setAlert } from "./alert";
import {
  ACCOUNT_DELETED,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profile/me");

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Get all profiles
export const getProfiles = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    try {
      const res = await axios.get("/api/profile");

      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Get profile by ID
export const getProfileById = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Get Github repos
export const getGithubRepos = (username) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);

      dispatch({
        type: GET_REPOS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Create or update a profile
export const createProfile = (formData, edit = false) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        window.location.pathname = "/dashboard";
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// Add Experience
export const addExperience = (formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/experience", formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert("Experience Added", "success"));

      return (window.location.pathname = "/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// Add Education
export const addEducation = (formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/education", formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert("Education Added", "success"));

      window.location.pathname = "/dashboard";
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// Delete experience
export const deleteExperience = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert("Experience Removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// Delete education
export const deleteEducation = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert("Education Removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// Delete account & profile
export const deleteAccount = () => {
  return async (dispatch) => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      try {
        await axios.delete("/api/profile");

        dispatch({
          type: CLEAR_PROFILE,
        });

        dispatch({
          type: ACCOUNT_DELETED,
        });

        dispatch(setAlert("Your account has been permanently deleted"));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
};
