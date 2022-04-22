const DragonDeleteDialog = ({ dragon }) => {
  return (
    <Dialog isOpen={showDialog} onDismiss={close}>
      <button className="close-button" onClick={close}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </button>
      <p>Are you sure to delete "{dragon.name}"?</p>
    </Dialog>
  );
};
