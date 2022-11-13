import axios from 'axios';
import create from 'zustand';

const useStore = create((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),

    getTeachers : axios.get("/api/getteacher").then(res => {
        return res.data
    }),
    getClasses : axios.get("/api/getclass").then(res => {
        return res.data
    }),
    getSchools : axios.get("/api/getschool").then(res => {
        return res.data
    }),
}));
export default useStore;