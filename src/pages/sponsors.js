import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import customAxios from "@/utils/axios";

function Sponsors() {
  // ! Local states
  const [allSponsors, setAllSponsors] = useState(null);
  // ! Local handlers
  const fetchAllSponsors = () => {
    customAxios
      .get(`/airtable/sponsors`, {
        headers: { workspace: "2" },
      })
      .then((res) => {
        console.log("res", res);
        setAllSponsors(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  // ! Local effects
  useEffect(() => {
    fetchAllSponsors();
  }, []);
  console.log("allSponsors", allSponsors);
  return (
    <DashboardLayout>
      <div className="mt-10">Sponsors</div>
    </DashboardLayout>
  );
}

export default Sponsors;
