import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import precisionHeartIcon from "../../assets/favicon.png";

export default function OthersGetin() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
      if (errors[field as keyof typeof errors]) {
        setErrors({
          ...errors,
          [field]: "",
        });
      }
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ecf9fc",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: -100,
          top: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: 'linear-gradient(135deg,rgba(255, 15, 123, 1) 0%, rgba(255, 255, 255, 1) 100%)',
          opacity: 0.2,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          right: -100,
          bottom: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: 'linear-gradient(135deg,rgba(255, 255, 255, 1) 0%, rgba(255, 15, 123, 1) 100%)',
          opacity: 0.1,
        }}
      ></Box>
      {!isMobile && (
        <a href="https://hearthealth.ahimsa.global/" style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            position: "absolute",
            left: 50,
            top: 50,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={precisionHeartIcon}
              alt="Logo"
              sx={{ width: 40, height: 40, mr: 1 }}
            ></Box>
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              Precision-Heart
            </Typography>
          </Box>
        </Box>
        </a>
      )}
      <Container maxWidth="sm"
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.12)',
        margin: '0 auto',
        padding: '48px',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF'
      }}
      >
        {isMobile && (
          <a href="https://hearthealth.ahimsa.global/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <Box
              component="img"
              src={precisionHeartIcon}
              alt="Logo"
              sx={{ width: 40, height: 40, mr: 1 }}
            ></Box>
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              Precision-Heart
            </Typography>
          </Box>
          </a>
        )}
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            color: "#2d3748",
            fontWeight: "600",
            fontSize: isMobile ? "18px" : "30px",
          }}
        >
          Please fill your basic info
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                required
                value={formData.firstName}
                onChange={handleChange("firstName")}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange("lastName")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email"
                required
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange("contactNumber")}
                helperText="Format: +1234567890"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange("message")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "primary.main",
                }}
              >
                Submit
              </Button>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  mt: 2,
                  ml: 2,
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
