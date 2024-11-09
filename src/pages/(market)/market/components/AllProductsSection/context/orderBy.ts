import { atom } from "jotai";

const marketOrderByAtom = atom<"최신순" | "좋아요순">("최신순");

export default marketOrderByAtom;
