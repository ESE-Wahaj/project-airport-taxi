import Layout from "../../layout";
import {React, useEffect, useRef} from 'react'
import Fleet from "../../components/admin components/Fleet";
function FleetPage() {
    const componentRef = useRef(null);
    useEffect(() => {
        if (componentRef.current) {
          componentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, []);
    return (
        <>
            <Layout>
            <div ref={componentRef}>
                <Fleet />
                </div>
            </Layout>
        </>
    )
}
export default FleetPage