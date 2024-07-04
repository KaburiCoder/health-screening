export interface ModalProps {
  isOpen: boolean;
  onOpenChange: () => void
  onOpen?: () => void;
  onClose?: () => void;
}