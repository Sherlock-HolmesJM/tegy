import { useState } from "react"

type ModalElement = any

/**
 * This hook opens and closes the modal, and determines when the modal should unmount from the DOM.
 * @param reveal
 * @returns
 */
export const useModalMount = (reveal: boolean) => {
  const [canUnmount, setCanUnmount] = useState(true)

  const handleUnmount = (parent: ModalElement) => () => {
    // openModal(parent, false)
    setCanUnmount(true)
  }

  const openModal = (parent: ModalElement, open: boolean) => {
    if (!open) parent.close()
    else if (!parent.attributes.getNamedItem("open")) parent.showModal()
  }

  return {
    shouldUnmount: reveal ? false : canUnmount,
    openModal,
    setCanUnmount,
    handleUnmount,
  }
}
