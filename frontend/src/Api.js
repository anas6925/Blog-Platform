import axios from "axios";

import url from "./config/serverUrl";
export const signup = async (userData) => {
  try {
    const response = await fetch(`${url}/signupUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    let responseText = await response.text();
    let jsonRes = JSON.parse(responseText);

    return jsonRes;
  } catch (error) {
    console.error(
      "Login failed",
      error.response ? error.response.data : error.message
    );
    throw new Error("Login failed");
  }
};

export const login = async (userData) => {
  try {
    const response = await fetch(`${url}/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    let responseText = await response.text();
    let jsonRes = JSON.parse(responseText);
    return jsonRes;
  } catch (error) {
    console.error(
      "Login failed",
      error.response ? error.response.data : error.message
    );
    throw new Error("Login failed");
  }
};
