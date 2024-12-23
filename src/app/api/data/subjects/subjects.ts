"use server";
import { cookies } from "next/headers";

export interface SubjectPayload {
  name: string;
  description: string;
}

export interface SubjectResponse {
  message: string;
}

const accessToken = () => {
  const cookieName = "access_token";
  const cookie = cookies().get(cookieName)?.value;
  return cookie;
};

export async function createSubject(payload: SubjectPayload) {
  const cookie = await accessToken();

  if (!cookie) {
    throw new Error("No access token found");
  } else {
    try {
      // Send POST request with Bearer token and payload
      const response = await fetch("http://127.0.0.1:8000/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Subject created:", data);
        return { message: "Subject created successfully" };
      } else {
        console.error("Error:", data.message);
        console.log(cookie);
        throw new Error(data.message || "Failed to create subject");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }
}

export async function getSubjects(): Promise<any> {
  const cookie = await accessToken();

  if (!cookie) {
    throw new Error("No access token found");
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/subjects/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching subjects:", errorData);
      throw new Error(errorData.message || "Failed to fetch subjects");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
}

export async function getSubjectById(id: number): Promise<any> {
  const cookie = await accessToken();

  if (!cookie) {
    throw new Error("No access token found");
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/subjects/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
}

export async function updateSubject(id: number,data: { name: string; description: string }) {
  const cookie = await accessToken();
  if (!cookie) {
    throw new Error("No access token found");
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/subjects/${id}`, {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData?.message || "Failed to update subject.";
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred."
    );
  }
}

export async function dropSubjects(id: number): Promise<any> {
  const cookie = await accessToken();

  if (!cookie) {
    throw new Error("No access token found");
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/subjects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
}
