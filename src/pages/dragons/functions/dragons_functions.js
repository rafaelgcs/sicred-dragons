import toast from "react-hot-toast";

const removeDragonDialog = (dragon, onSubmit) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate__backInDown" : "animate__backOutUp"
      } animate__animated bg-light row rounded p-2 shadow`}
    >
      <div className="col-12">
        <div className="">
          <div className="ml-3 flex-1">
            <h3 className="">Are you sure to delete this dragon?</h3>
            <p className="mt-1">{dragon.name}</p>
          </div>
          <div className="row">
            <div className="col-auto">
              <button
                onClick={() => {
                  onSubmit(dragon);
                  toast.dismiss(t.id);
                }}
                className="btn btn-danger ph-1"
              >
                Yes
              </button>
            </div>
            <div className="col-auto">
              <button onClick={() => toast.dismiss(t.id)} className="btn ph-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};

export { removeDragonDialog };
