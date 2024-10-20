import { atom } from "jotai";

interface AtomType {
  totalPage: number | null;
  currentPage: number | null;
}

const marketPageAtom = atom<AtomType>({ totalPage: null, currentPage: null });

export default marketPageAtom;
