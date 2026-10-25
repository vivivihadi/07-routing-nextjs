import { createPortal } from "react-dom";
import { useEffect } from "react";

interface ModalProps{
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
  
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
	
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return createPortal(
        <div
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
            }}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div
                style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px" }}
                onClick={(event) => event.stopPropagation()}
            >
                {children}
            </div>
        </div>
        ,
        document.body
    );
}