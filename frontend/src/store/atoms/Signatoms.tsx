import { atom } from "recoil";

export const emailAtom=atom({
    key:"emailAtom",
    default:""
})
export const nameAtom=atom({
    key:"nameAtom",
    default:""
})

export const passwordAtom=atom({
    key:"passwordAtom",
    default:""
})

export const signinAtom=atom({
    key:"signinAtom",
    default:{}
})