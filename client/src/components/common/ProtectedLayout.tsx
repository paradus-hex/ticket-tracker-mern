import React from "react";
import SideBar from "./Sidebar";
import { useSession } from "next-auth/react";
import { Box, Card, Typography } from "@mui/material";
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Card className="flex items-center justify-center">
        <Typography>Loading</Typography>
      </Card>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Box className="flex h-screen w-screen items-center justify-center">
        <Card className=" flex  items-center justify-center">
          <Typography className="p-10">Access Denied.</Typography>
        </Card>
      </Box>
    );
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <SideBar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
