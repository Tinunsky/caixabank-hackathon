import { atom } from 'nanostores';

export const budgetAlertStore = atom({
    isVisible: false,          
    message: '',               
    notificationCount: 0,      
});

export const updateBudgetAlert = (message) => {
    budgetAlertStore.set({
        isVisible: true, 
        message: message, 
        notificationCount: budgetAlertStore.get().notificationCount + 1,
    });
};

export const resetBudgetAlert = () => {
    budgetAlertStore.set({
        isVisible: false,
        message: '',
        notificationCount: 0
    });
};

export const getBudgetAlertState = () => budgetAlertStore.get();
