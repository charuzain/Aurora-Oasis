import { useState } from "react";
import CabinForm from "../CabinForm/CabinForm";

const AddCabin = () => {
  const [showForm , setShowForm] = useState(false)
  const addCabinHandler = () => {
    setShowForm(!showForm)
  }; 
  return (
    <div>
      <button onClick={addCabinHandler}>AddCabin</button>
      {showForm && <p><CabinForm/></p>}
    </div>
  );
};

export default AddCabin;
