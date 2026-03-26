import Layout from "../../layout";
import{ React,useEffect,useRef} from 'react'
import DashBoard from '../../components/admin components/DashBoard'
function AdminDashBoardPage(){
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
        <DashBoard/>
        </div>
        </Layout>
        </>
    )
}
export default AdminDashBoardPage