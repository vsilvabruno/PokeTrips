import AddLocationForm from "../components/form/AddLocationForm";

function FormView() {
  // Form View component rendering
  return (
    <>
      <main>
        <div className="title-container">
          New location
        </div>
        <AddLocationForm />
      </main>
    </>
  )
};
  
export default FormView;