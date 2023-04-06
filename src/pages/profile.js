import MyProfile from "@/components/profile/MyProfile";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

function Profile() {
  return (
    <DashboardLayout currentTab="Profile">
      <MyProfile />
    </DashboardLayout>
  );
}

export default Profile;
