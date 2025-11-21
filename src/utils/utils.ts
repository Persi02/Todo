export const showModal = () => {
  const dialogElement = document.getElementById(
    "my_modal_4"
  ) as HTMLDialogElement;
  dialogElement.showModal();
};
export const closeModal = () => {
  const dialogElement = document.getElementById(
    "my_modal_4"
  ) as HTMLDialogElement;
  dialogElement.close();
};
