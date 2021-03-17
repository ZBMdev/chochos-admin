import { useToast } from 'primevue/usetoast';

export function formatDate(date: Date) {
    return new Date(date).toDateString()
}

export function filterDate(value: string | null | undefined, filter: string | Date | null | undefined) {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value === formatDate(new Date(filter));
}

interface ToastParam {
    summary?: string;
    detail?: string;
    life?: number;
    closable?: boolean;
    group?: string;
}

export const toast = {
    toast: useToast(),
    error(args: ToastParam) {
        this.toast.add({ severity: "error", ...args });
    },
    success(args: ToastParam) {
        this.toast.add({ severity: "success", ...args });
    },
    info(args: ToastParam) {
        this.toast.add({ severity: "info", ...args });
    },
    warning(args: ToastParam) {
        this.toast.add({ severity: "warning", ...args });
    },
}