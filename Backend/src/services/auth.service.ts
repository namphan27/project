import { UserData } from "../type/user.type";
import { verifyPassword } from "../utils/hashing";
import { userService } from "./user.service";
import {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  decodedToken,
} from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { redisClient } from "../utils/redis";
import { HttpException } from "../utils/exception";
export const authService = {
  async register(userData: UserData) {
    const user = await userService.create(userData);
    return user;
  },
  async login(email: string, password: string) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new Error("not found user");
    }
    if (!verifyPassword(password, user.password!)) {
      throw new Error("password wrong");
    }
    const accessToken = createAccessToken({
      id: user.id,
      
    });

    const refreshToken = createRefreshToken({
      id: user.id,
    });

    return { accessToken, refreshToken };
  },
  async profile(token: string) {
    const decoded = verifyAccessToken(token) as JwtPayload & { id: number };
    if (!decoded) {
      throw new Error("token invalid");
    }
    if (await this.verifyBlacklist(decoded.jti!)) {
      throw new Error("TOKEN_BLACKLIST");
    }

    const user = await userService.find(decoded.id);
    return { user, decoded };
  },
  async logout(jti: string, exp: number) {
    const seconds = Math.floor(exp - Date.now() / 1000);

    await redisClient.setEx(`blacklist:${jti}`, seconds, jti);
    return true;
  },
  async verifyBlacklist(jti: string) {
    const blacklist = await (await redisClient).get(`blacklist:${jti}`);

    return blacklist;
  },
  async refreshToken(refreshToken: string) {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new HttpException("refresh token ko hop le", 400);
    }
    const { id } = decoded as JwtPayload & { id: number };
    const payloadRefresh = decodedToken(refreshToken);

    const jtiRefreshToken = (payloadRefresh as JwtPayload).jti;

    const expRefreshToken = (payloadRefresh as JwtPayload).exp;

    const seconds = Math.floor(expRefreshToken! - Date.now() / 1000);

    await redisClient.setEx(
      `refreshToken:${jtiRefreshToken}`,
      seconds,
      String(id),
    );
    const accessToken = createAccessToken({
      id,
    });

    return { accessToken, refreshToken };
  },
};
