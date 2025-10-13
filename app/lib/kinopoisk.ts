import { KinopoiskDev } from "@openmoviedb/kinopoiskdev_client";

export const kp = new KinopoiskDev(process.env.API_KEY!);
