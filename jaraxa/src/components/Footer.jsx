import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "success.main",
        color: "white",
        py: 2,
        mt: 4,
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          {new Date().getFullYear()} JaraxaCare. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
