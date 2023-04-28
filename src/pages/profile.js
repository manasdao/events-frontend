import MyProfile from "@/components/profile/MyProfile";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

function Profile() {
  return (
    <DashboardLayout currentTab="Profile" hideChat hideBottomNav>
      <MyProfile />
    </DashboardLayout>
  );
}

export default Profile;
