import axios from 'axios';
import create from 'zustand';

const useStore = create((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),

    getTeachers : axios.get("/api/getteacher").then(res => {
        return res.data
    }),
    getItems : axios.get("/api/getitem").then(res => {
        return res.data
    }),
    getSchools : axios.get("/api/getschool").then(res => {
        return res.data
    }),
    getSubjects : axios.get("/api/getsubject").then(res => {
        return res.data
    }),
    getType : axios.get("/api/gettype").then(res => {
        return res.data
    }),
    admSidBarMenuItem : null,
    setAdmSidBarMenuItem : admSidBarMenuItem => set({admSidBarMenuItem})
}));
export default useStore;