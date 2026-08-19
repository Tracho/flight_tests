import { create } from "zustand";
import { persist } from "zustand/middleware";

type TypeObjTimeTic = {
  timeSeconds: number;
  timeMinutes: number;
  TimeHours: number;
};

const ObjTimeTic: TypeObjTimeTic = {
  timeSeconds: 0,
  timeMinutes: 0,
  TimeHours: 0,
};

interface TimeTic {
  time: TypeObjTimeTic;

  setTime: (
    value:
      | Partial<TypeObjTimeTic>
      | ((time: TypeObjTimeTic) => TypeObjTimeTic)
  ) => void;
}
export const useTimeTic = create<TimeTic>()(
  persist(
    (set,get) => ({
      time: ObjTimeTic,

      setTime: (value) =>
        set((state) => ({
          time:
            typeof value === "function"
              ? value(state.time)
              : {
                  ...state.time,
                  ...value,
                },
        })),
    }),
    { name: "time-tic" }
  )
); 
 

export const getTime = () => useTimeTic.getState().time
export const useTime = () =>
  useTimeTic((state) => state.time);

export const useSetTime = () =>
  useTimeTic((state) => state.setTime);