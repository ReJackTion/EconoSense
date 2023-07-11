// Chakra imports
import {
  Box,
  Grid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import UserLayout from "layouts/user";

// Custom components
import Banner from "views/user/profile/components/Banner";
import General from "views/user/profile/components/General";
import Notifications from "views/user/profile/components/Notifications";
import Projects from "views/user/profile/components/Projects";
import Storage from "views/user/profile/components/Storage";
import Upload from "views/user/profile/components/Upload";

// Assets
import banner from "img/auth/banner.png";
import avatar from "img/avatars/avatar4.png";

import { useSession } from "next-auth/react";

export default function ProfileOverview() {
  const { data: session } = useSession();

  return (
    <UserLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        {session ? (
          <>
            <Grid
              templateColumns={{
                base: "1fr",
                lg: "1.34fr 1fr 1.62fr",
              }}
              templateRows={{
                base: "repeat(3, 1fr)",
                lg: "1fr",
              }}
              gap={{ base: "20px", xl: "20px" }}
            >
              <Banner
                gridArea="1 / 1 / 2 / 2"
                banner={banner}
                avatar={avatar}
                name={session?.user?.name ? session.user.name : "User"}
                job="Product Designer"
                posts="17"
                followers="9.7k"
                following="274"
              />
              {/* <Storage
            gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
            used={25.6}
            total={50}
          /> */}
              {/* <Upload
                gridArea={{
                  base: "3 / 1 / 4 / 2",
                  lg: "1 / 3 / 2 / 4",
                }}
                minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
                pe="20px"
                pb={{ base: "100px", lg: "20px" }}
              /> */}
            </Grid>

            <Notifications
              used={25.6}
              total={50}
              gridArea={{
                base: "3 / 1 / 4 / 2",
                lg: "2 / 1 / 3 / 3",
                "2xl": "1 / 3 / 2 / 4",
              }}
            />
          </>
        ) : (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Your are not sign in!</AlertTitle>
            <AlertDescription>
              This is a protected page, please sign in to visit.
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </UserLayout>
  );
}
