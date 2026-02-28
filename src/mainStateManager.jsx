import { create } from 'zustand'

export const useMainStateManager = create((set,get) => ({
apiState:[],
detailsApiState:{},
setApiState:(data) => {
    set({apiState: data});
},
}));

export const {setApiState} = useMainStateManager.getState();