import { toast } from "sonner"

export const toastSuccess = (message) => {
    return toast.success(message)
}

export const toastError = (message) => {
    return toast.error(message)
}

export const toastInfo = (message) => {
    return toast.info(message)
}

export const toastWarning = (message) => {
    return toast.warning(message)
}

export const handleVerification = (message, goTo, onClose) => {
    toast.warning(
        message,
        {
        action: {
            label: "Oui",
            onClick: () => goTo(),
        },
        cancel: {
            label: "Non",
            onClick: () => {onClose?.()},
        },
        duration: 10000,
        onAutoClose: () => { onClose?.(); },
        }
    );
};