import Layout from "../../layout";
import {React, useEffect, useRef} from 'react'
import EditFleet from '../../components/admin components/editFleet'
function EditFleetPage(){
  const componentRef = useRef(null);
  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
    return(
        <>
        <Layout>
        <div ref={componentRef}>

        <EditFleet/>
        </div>
        </Layout>
        </>
    )
}
export default EditFleetPage