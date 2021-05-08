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


export function setWithExpiry(key: string, value: string, ttl = 3*24*60*60) {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}

	localStorage.setItem(key, JSON.stringify(item))
}

export function getWithExpiry(key: string) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}