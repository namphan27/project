import Cookies from "js-cookie";
export const loginApi = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );
  const data = await response.json();
  console.log("API:", process.env.NEXT_PUBLIC_SERVER_API);
  if (!response.ok) {
    throw new Error(data.message || "Đăng nhập thất bại");
  }

  return data;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

// export const profileApi = async () => {
//   const token = localStorage.getItem("accessToken");

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_API}/auth/profile`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );

//   const data = await res.json();

//   if (!res.ok) throw new Error(data.message);

//   return data.data;
// };

export const profileApi = async () => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("Không tìm thấy token đăng nhập");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/auth/profile`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.trim()}`,
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Lỗi khi lấy thông tin profile");
  }

  return data.data;
};
