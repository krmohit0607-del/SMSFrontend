import Layout from "../../components/Layout";
import AttendanceDashboard from "./AttendanceDashboard";

const Attendance = () => {
  return (
    <Layout role="schooladmin">
      <h1 className="text-2xl font-bold mb-4">Attendance</h1>
      <AttendanceDashboard />
    </Layout>
  );
};

export default Attendance;
