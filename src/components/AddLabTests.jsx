import React , {useState}from 'react'
import './addlabtest.css'
import axiosInstanceToken from "../helpers/axiosInstanceToken"; 

const AddLabTests = () => {

    const [lab_id, setLabID] = useState(null)
    const [test_name, setName] = useState(null)
    const [test_description, setDescription] = useState(null)
    const [test_cost, setCost] = useState(null)
    const [test_discount, setDiscount] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [failure, setFailure] = useState(null)

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true)
        setSuccess(null)
        setFailure(null)

        axiosInstanceToken.post('/addlabtests',{
            lab_id: lab_id,
            test_name: test_name,
            test_description: test_description,
            test_cost: test_cost,
            test_discount: test_discount
        })
            .then(function (response){
                console.log(response.data)
                setLoading(false)
                setSuccess(response.data.message)
            })

            .catch(function (error) {
                //Update Loading and Error Hooks
                console.log(error.message);
                setLoading(false)
                setFailure(error.message);
            });

    }

    return (
        <form onSubmit={handleSubmit} className="add-lab-test-form">
          <h2>Add Lab Test</h2>
          {loading && <div className= "response" style={{color:'blue'}}> Please Wait..</div>}
          {success && <div className= "response" style={{color:'green'}}> {success}</div>}
          {failure && <div className= "response" style={{color:'red'}}> {failure}</div>}
          <div className="form-group">
            <label htmlFor="lab_id">Lab ID:</label>
            <input type="text" id="lab_id" name="lab_id" value={lab_id} onChange={(e) => setLabID(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="test_name">Test Name:</label>
            <input type="text" id="test_name" name="test_name" value={test_name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="test_description">Test Description:</label>
            <input type='text' id="test_description" name="test_description" value={test_description}onChange={(e) => setDescription(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="test_cost">Test Cost:</label>
            <input type="number" id="test_cost" name="test_cost" value={test_cost} onChange={(e) => setCost(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="test_discount">Test Discount:</label>
            <input type="number" id="test_discount" name="test_discount" value={test_discount} onChange={(e) => setDiscount(e.target.value)}/>
          </div>
          <button type="submit" className="submit-button">Add Lab Test</button>
        </form>
      );
      
}

export default AddLabTests