import { atom } from "jotai";

export enum Device {
  Mobile = "mobile",
  Tablet = "tablet",
  PC = "pc",
}

const deviceStateAtom = atom<Device | null>(null);

export default deviceStateAtom;
